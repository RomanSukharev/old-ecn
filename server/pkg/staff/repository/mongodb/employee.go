package staff_mongodb

import (
	"context"
	"maps"
	"time"

	"github.com/pinks-agency/ecn/server/pkg/errs"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	staff_repository "github.com/pinks-agency/ecn/server/pkg/staff/repository"
	staff_mongodb_dao "github.com/pinks-agency/ecn/server/pkg/staff/repository/mongodb/dao"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type employeeRepository struct {
	collection *mongo.Collection
}

func NewEmployeeRepository(db *mongo.Database) staff_repository.IEmployeeDataRepository {
	collection := db.Collection("employees")

	indexes := mongo.IndexModel{Keys: bson.D{
		{Key: "name", Value: "text"},
		{Key: "surname", Value: "text"},
		{Key: "patronymic", Value: "text"},
	}}
	collection.Indexes().CreateOne(context.TODO(), indexes)

	return &employeeRepository{
		collection: collection,
	}
}

func (r *employeeRepository) Search(ctx context.Context, skip *int, limit *int, sort staff_entity.EmployeeSort, filter *staff_entity.EmployeeFilter) ([]*staff_entity.Employee, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{}

	// Enrich query with filters
	if filter != nil {
		if filter.DepartmentID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.DepartmentID)
			if err == nil {
				maps.Copy(query, bson.M{"department": eid})
			}
		}

		if filter.GroupID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.GroupID)
			if err == nil {
				maps.Copy(query, bson.M{"group": eid})
			}
		}

		if filter.RoleID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.RoleID)
			if err == nil {
				maps.Copy(query, bson.M{"role": eid})
			}
		}

		if filter.IsActive != nil {
			maps.Copy(query, bson.M{"isActive": *filter.IsActive})
		}

		if filter.IsPublished != nil {
			maps.Copy(query, bson.M{"isPublished": *filter.IsPublished})
		}

		if filter.IsDeleted != nil {
			maps.Copy(query, bson.M{"isDeleted": *filter.IsDeleted})
		}

		if filter.Keyword != nil {
			maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
		}
	}

	total, err := r.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*staff_entity.Employee{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case staff_entity.EmployeeSortSurnameAsc:
		opts.SetSort(bson.D{{Key: "surname", Value: 1}})
	case staff_entity.EmployeeSortSurnameDesc:
		opts.SetSort(bson.D{{Key: "surname", Value: -1}})
	case staff_entity.EmployeeSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "surname", Value: 1}})
	case staff_entity.EmployeeSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := r.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*staff_entity.Employee
	for cursor.Next(ctx) {
		var dao *staff_mongodb_dao.EmployeeDAO
		if err = cursor.Decode(&dao); err != nil {
			return nil, 0, err
		}
		entities = append(entities, dao.ToEntity())
	}

	// Handle iteration error
	if err := cursor.Err(); err != nil {
		return nil, 0, err
	}

	// All done
	return entities, int(total), nil
}

func (r *employeeRepository) GetByID(ctx context.Context, id string) (*staff_entity.Employee, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.collection.FindOne(ctx, query)

	var dao *staff_mongodb_dao.EmployeeDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *employeeRepository) GetByEmail(ctx context.Context, email string) (*staff_entity.Employee, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	query := bson.M{"email": email}
	doc := r.collection.FindOne(ctx, query)

	var dao *staff_mongodb_dao.EmployeeDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeEmployeeLogin
	}

	return dao.ToEntity(), nil
}

func (r *employeeRepository) Create(ctx context.Context, input staff_entity.Employee) (*staff_entity.Employee, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(staff_mongodb_dao.EmployeeDAO).FromEntity(input)

	res, err := r.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneEmployeeCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeEmployeeCreate
	}

	return dao.ToEntity(), nil
}

func (r *employeeRepository) Update(ctx context.Context, id string, input staff_entity.Employee) (*staff_entity.Employee, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(staff_mongodb_dao.EmployeeDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDEmployeeUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeEmployeeUpdate
	}

	return dao.ToEntity(), nil
}

func (r *employeeRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDEmployeeDelete
	}

	query := bson.M{"_id": &entityId}
	if _, err := r.collection.DeleteOne(ctx, query); err != nil {
		return errs.ErrConvertIDEmployeeDelete
	}

	return nil
}

func (r *employeeRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDBulkeDeleteEmployee
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"isDeleted": true}}

	if _, err := r.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyBulkDeleteEmployee
	}

	return nil
}

func (r *employeeRepository) BulkActivate(ctx context.Context, ids []string, state bool) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDBulkActivateEmployee
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"isActive": state}}

	if _, err := r.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyBulkActivateEmployee
	}

	return nil
}
func (r *employeeRepository) BulkPublish(ctx context.Context, ids []string, state bool) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDBulkPublishEmployee
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"isPublished": state}}

	if _, err := r.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyBulkPublishEmployee
	}

	return nil
}

func (r *employeeRepository) BulkAssignRole(ctx context.Context, ids []string, role string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDBulkAssignRoleEmployee
		}
		entityIds = append(entityIds, entityId)
	}

	roleId, err := primitive.ObjectIDFromHex(role)
	if err != nil {
		return errs.ErrConvertRoleIDBulkAssignRoleEmployee
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"role": roleId}}

	if _, err := r.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyBulkAssignRoleEmployee
	}

	return nil
}

func (r *employeeRepository) BulkAssignDepartment(ctx context.Context, ids []string, department string, group *string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDBulkAssignDepartmentEmployee
		}
		entityIds = append(entityIds, entityId)
	}

	departmentId, err := primitive.ObjectIDFromHex(department)
	if err != nil {
		return errs.ErrConvertDepartmentIDBulkAssignDepartmentEmployee
	}

	var groupId *primitive.ObjectID
	if group != nil {
		id, err := primitive.ObjectIDFromHex(*group)
		if err != nil {
			return errs.ErrConvertGroupIDBulkAssignDepartmentEmployee
		}
		groupId = &id
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"department": departmentId, "group": groupId}}

	if _, err := r.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyBulkAssignDepartmentEmployee
	}

	return nil
}

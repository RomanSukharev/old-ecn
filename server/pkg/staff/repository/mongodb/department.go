package staff_mongodb

import (
	"context"
	"maps"
	"slices"
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

type departmentRepository struct {
	departmentCollection      *mongo.Collection
	departmentGroupCollection *mongo.Collection
}

func NewDepartmentRepository(db *mongo.Database) staff_repository.IDepartmentDataRepository {
	departmentCollection := db.Collection("departments")
	departmentGroupCollection := db.Collection("departmentGroups")

	indexes := mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}}
	departmentCollection.Indexes().CreateOne(context.TODO(), indexes)

	return &departmentRepository{
		departmentCollection:      departmentCollection,
		departmentGroupCollection: departmentGroupCollection,
	}
}

func (r *departmentRepository) Search(ctx context.Context, skip *int, limit *int, sort staff_entity.DepartmentSort, filter *staff_entity.DepartmentFilter) ([]*staff_entity.Department, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{}

	// Enrich query with filters
	if filter != nil {
		if filter.Keyword != nil {
			maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
		}
	}

	total, err := r.departmentCollection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*staff_entity.Department{}, 0, nil
	}

	pipeline := mongo.Pipeline{}
	pipeline = append(pipeline, bson.D{{Key: "$match", Value: query}})
	pipeline = append(pipeline, bson.D{{Key: "$lookup", Value: bson.M{
		"from":         "departmentGroups",
		"localField":   "_id",
		"foreignField": "department",
		"as":           "groups",
	}}})

	var sortStage bson.D
	switch sort {
	case staff_entity.DepartmentSortTitleAsc:
		sortStage = bson.D{{Key: "title", Value: 1}}
	case staff_entity.DepartmentSortTitleDesc:
		sortStage = bson.D{{Key: "title", Value: -1}}
	default:
		sortStage = bson.D{{Key: "title", Value: 1}}
	}
	pipeline = append(pipeline, bson.D{{Key: "$sort", Value: sortStage}})

	if skip != nil {
		pipeline = append(pipeline, bson.D{{Key: "$skip", Value: int64(*skip)}})
	}
	if limit != nil {
		pipeline = append(pipeline, bson.D{{Key: "$limit", Value: int64(*limit)}})
	}

	cursor, err := r.departmentCollection.Aggregate(ctx, pipeline)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*staff_entity.Department
	for cursor.Next(ctx) {
		var dao *staff_mongodb_dao.DepartmentWithGroupsDAO
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

func (r *departmentRepository) GetByID(ctx context.Context, id string) (*staff_entity.Department, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.departmentCollection.FindOne(ctx, query)

	var dao *staff_mongodb_dao.DepartmentWithGroupsDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	groupsCursor, err := r.departmentGroupCollection.Find(ctx, bson.M{"department": entityId})
	if err != nil {
		return nil, err
	}
	defer groupsCursor.Close(ctx)

	for groupsCursor.Next(ctx) {
		var groupDAO *staff_mongodb_dao.DepartmentGroupDAO
		if err = groupsCursor.Decode(&groupDAO); err != nil {
			return nil, err
		}
		dao.Groups = append(dao.Groups, *groupDAO)
	}

	return dao.ToEntity(), nil
}

func (r *departmentRepository) Create(ctx context.Context, input staff_entity.Department) (*staff_entity.Department, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(staff_mongodb_dao.DepartmentWithGroupsDAO).FromEntity(input)

	res, err := r.departmentCollection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneDepartmentCreate
	}

	groups := []interface{}{}
	for _, v := range dao.Groups {
		*v.DepartmentID = (res.InsertedID).(primitive.ObjectID)
		groups = append(groups, v)
	}

	if _, err := r.departmentGroupCollection.InsertMany(ctx, groups); err != nil {
		return nil, errs.ErrInsertManyDepartmentGroupCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.departmentCollection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeDepartmentCreate
	}

	return dao.ToEntity(), nil
}

func (r *departmentRepository) Update(ctx context.Context, id string, input staff_entity.Department) (*staff_entity.Department, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDDepartmentUpdate
	}

	query := bson.M{"_id": entityId}
	doc := r.departmentCollection.FindOne(ctx, query)

	var oldDAO *staff_mongodb_dao.DepartmentWithGroupsDAO
	if err := doc.Decode(&oldDAO); err != nil {
		return nil, errs.ErrDecodeOldDepartmentUpdate

	}

	groupsCursor, err := r.departmentGroupCollection.Find(ctx, bson.M{"department": entityId})
	if err != nil {
		return nil, err
	}
	defer groupsCursor.Close(ctx)

	for groupsCursor.Next(ctx) {
		var groupDAO *staff_mongodb_dao.DepartmentGroupDAO
		if err = groupsCursor.Decode(&groupDAO); err != nil {
			return nil, errs.ErrDecodeGroupDepartmentUpdate
		}
		oldDAO.Groups = append(oldDAO.Groups, *groupDAO)
	}

	dao := new(staff_mongodb_dao.DepartmentWithGroupsDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc = r.departmentCollection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeDepartmentUpdate
	}

	for _, v := range dao.Groups {
		if v.ID == primitive.NilObjectID {
			v.DepartmentID = &entityId
			v.CreatedAt = time.Now()
			v.UpdatedAt = v.CreatedAt
			if _, err := r.departmentGroupCollection.InsertOne(ctx, v); err != nil {
				return nil, errs.ErrInsertOneGroupDepartmentUpdate
			}
		} else {
			id := v.ID
			v.ID = primitive.NilObjectID
			v.UpdatedAt = time.Now()
			if _, err := r.departmentGroupCollection.UpdateByID(ctx, id, bson.M{"$set": v}); err != nil {
				return nil, errs.ErrUpdateByIDGroupDepartmentUpdate
			}
		}
	}

	for _, v := range oldDAO.Groups {
		if !slices.ContainsFunc(dao.Groups, func(e staff_mongodb_dao.DepartmentGroupDAO) bool {
			return e.ID == v.ID
		}) {
			if _, err := r.departmentGroupCollection.DeleteOne(ctx, bson.M{"_id": v.ID}); err != nil {
				return nil, errs.ErrDeleteOneGroupDepartmentUpdate
			}
		}
	}

	return dao.ToEntity(), nil
}

func (r *departmentRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDDepartmentDelete
	}

	query := bson.M{"_id": entityId}
	if _, err := r.departmentCollection.DeleteOne(ctx, query); err != nil {
		return errs.ErrDeleteOneDepartmentDelete
	}

	query = bson.M{"department": entityId}
	if _, err := r.departmentGroupCollection.DeleteMany(ctx, query); err != nil {
		return errs.ErrDeleteManyGroupDepartmentDelete
	}

	return nil
}

func (r *departmentRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDDepartmentBulkDelete
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.departmentCollection.DeleteMany(ctx, query); err != nil {
		return errs.ErrDeleteManyDepartmentBulkDelete
	}

	query = bson.M{"department": bson.M{"$in": entityIds}}
	if _, err := r.departmentGroupCollection.DeleteMany(ctx, query); err != nil {
		return errs.ErrDeleteManyGroupDepartmentBulkDelete
	}

	return nil
}

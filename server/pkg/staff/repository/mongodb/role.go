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

type roleRepository struct {
	collection *mongo.Collection
}

func NewRoleRepository(db *mongo.Database) staff_repository.IRoleDataRepository {
	collection := db.Collection("roles")

	indexes := mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}}
	collection.Indexes().CreateOne(context.TODO(), indexes)

	return &roleRepository{
		collection: collection,
	}
}

func (r *roleRepository) Search(ctx context.Context, skip *int, limit *int, sort staff_entity.RoleSort, filter *staff_entity.RoleFilter) ([]*staff_entity.Role, int, error) {
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

	total, err := r.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*staff_entity.Role{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case staff_entity.RoleSortTitleAsc:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	case staff_entity.RoleSortTitleDesc:
		opts.SetSort(bson.D{{Key: "title", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	}

	cursor, err := r.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*staff_entity.Role
	for cursor.Next(ctx) {
		var dao *staff_mongodb_dao.RoleDAO
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

func (r *roleRepository) GetByID(ctx context.Context, id string) (*staff_entity.Role, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.collection.FindOne(ctx, query)

	var dao *staff_mongodb_dao.RoleDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *roleRepository) Create(ctx context.Context, input staff_entity.Role) (*staff_entity.Role, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(staff_mongodb_dao.RoleDAO).FromEntity(input)

	res, err := r.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneRoleCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeRoleCreate
	}

	return dao.ToEntity(), nil
}

func (r *roleRepository) Update(ctx context.Context, id string, input staff_entity.Role) (*staff_entity.Role, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(staff_mongodb_dao.RoleDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDRoleUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeRoleUpdate
	}

	return dao.ToEntity(), nil
}

func (r *roleRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDRoleDelete
	}

	query := bson.M{"_id": &entityId}
	if _, err := r.collection.DeleteOne(ctx, query); err != nil {
		return errs.ErrDeleteOneRoleDelete
	}

	return nil
}

func (r *roleRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDRoleBulkDelete
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.collection.DeleteMany(ctx, query); err != nil {
		return errs.ErrDeleteManyRoleBulkDelete
	}

	return nil
}

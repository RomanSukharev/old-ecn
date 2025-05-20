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

type positionRepository struct {
	collection *mongo.Collection
}

func NewPositionRepository(db *mongo.Database) staff_repository.IPositionDataRepository {
	collection := db.Collection("positions")

	indexes := mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}}
	collection.Indexes().CreateOne(context.TODO(), indexes)

	return &positionRepository{
		collection: collection,
	}
}

func (r *positionRepository) Search(ctx context.Context, skip *int, limit *int, sort staff_entity.PositionSort, filter *staff_entity.PositionFilter) ([]*staff_entity.Position, int, error) {
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
		return []*staff_entity.Position{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case staff_entity.PositionSortTitleAsc:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	case staff_entity.PositionSortTitleDesc:
		opts.SetSort(bson.D{{Key: "title", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	}

	cursor, err := r.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*staff_entity.Position
	for cursor.Next(ctx) {
		var dao *staff_mongodb_dao.PositionDAO
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

func (r *positionRepository) GetByID(ctx context.Context, id string) (*staff_entity.Position, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.collection.FindOne(ctx, query)

	var dao *staff_mongodb_dao.PositionDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *positionRepository) Create(ctx context.Context, input staff_entity.Position) (*staff_entity.Position, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(staff_mongodb_dao.PositionDAO).FromEntity(input)

	res, err := r.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOnePositionCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodePositionCreate
	}

	return dao.ToEntity(), nil
}

func (r *positionRepository) Update(ctx context.Context, id string, input staff_entity.Position) (*staff_entity.Position, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(staff_mongodb_dao.PositionDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDPositionUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodePositionUpdate
	}

	return dao.ToEntity(), nil
}

func (r *positionRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDPositionDelete
	}

	query := bson.M{"_id": &entityId}
	if _, err := r.collection.DeleteOne(ctx, query); err != nil {
		return errs.ErrDeleteOnePositionDelete
	}

	return nil
}

func (r *positionRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDPositionBulkDelete
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.collection.DeleteMany(ctx, query); err != nil {
		return errs.ErrDeleteManyPositionBulkDelete
	}

	return nil
}

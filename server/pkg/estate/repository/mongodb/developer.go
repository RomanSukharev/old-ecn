package estate_mongodb

import (
	"context"
	"maps"
	"time"

	"github.com/pinks-agency/ecn/server/pkg/errs"
	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	estate_repository "github.com/pinks-agency/ecn/server/pkg/estate/repository"
	estate_mongodb_dao "github.com/pinks-agency/ecn/server/pkg/estate/repository/mongodb/dao"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type developerRepository struct {
	collection *mongo.Collection
}

func NewDeveloperRepository(db *mongo.Database) estate_repository.IDeveloperDataRepository {
	collection := db.Collection("developers")

	indexes := mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}}
	collection.Indexes().CreateOne(context.Background(), indexes)

	return &developerRepository{
		collection: collection,
	}
}

func (r *developerRepository) Search(ctx context.Context, skip *int, limit *int, sort estate_entity.DeveloperSort, filter *estate_entity.DeveloperFilter) ([]*estate_entity.Developer, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{"isDeleted": bson.M{"$ne": true}}

	// Enrich query with filters
	if filter != nil {
		if filter.IsDeleted != nil && *filter.IsDeleted {
			maps.Copy(query, bson.M{"isDeleted": true})
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
		return []*estate_entity.Developer{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case estate_entity.DeveloperSortTitleAsc:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	case estate_entity.DeveloperSortTitleDesc:
		opts.SetSort(bson.D{{Key: "title", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	}

	cursor, err := r.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*estate_entity.Developer
	for cursor.Next(ctx) {
		var dao *estate_mongodb_dao.DeveloperDAO
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

func (r *developerRepository) GetByID(ctx context.Context, id string) (*estate_entity.Developer, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.collection.FindOne(ctx, query)

	var dao *estate_mongodb_dao.DeveloperDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *developerRepository) Create(ctx context.Context, input estate_entity.Developer) (*estate_entity.Developer, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(estate_mongodb_dao.DeveloperDAO).FromEntity(input)

	res, err := r.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneDeveloperCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeDeveloperCreate
	}

	return dao.ToEntity(), nil
}

func (r *developerRepository) Update(ctx context.Context, id string, input estate_entity.Developer) (*estate_entity.Developer, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(estate_mongodb_dao.DeveloperDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDDeveloperUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeDeveloperUpdate
	}

	return dao.ToEntity(), nil
}

func (r *developerRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDDeveloperDelete
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocDeveloperDelete
	}

	return nil
}

func (r *developerRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDDeveloperBulkDelete
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.collection.UpdateMany(ctx, query, bson.M{"$set": bson.M{"isDeleted": true}}); err != nil {
		return errs.ErrUpdateManyDeveloperBulkDelete
	}

	return nil
}

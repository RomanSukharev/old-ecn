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

type complexRepository struct {
	collection *mongo.Collection
}

func NewComplexRepository(db *mongo.Database) estate_repository.IComplexDataRepository {
	collection := db.Collection("complexes")

	indexes := mongo.IndexModel{Keys: bson.D{
		{Key: "title", Value: "text"},
		{Key: "description", Value: "text"},
		{Key: "address", Value: "text"},
	}}
	collection.Indexes().CreateOne(context.Background(), indexes)

	return &complexRepository{
		collection: collection,
	}
}

func (r *complexRepository) Search(ctx context.Context, skip *int, limit *int, sort estate_entity.ComplexSort, filter *estate_entity.ComplexFilter) ([]*estate_entity.Complex, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{"isDeleted": bson.M{"$ne": true}}

	// Enrich query with filters
	if filter != nil {
		if filter.DeveloperID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.DeveloperID)
			if err == nil {
				maps.Copy(query, bson.M{"developer": eid})
			}
		}

		if filter.PublicationStatus != nil {
			maps.Copy(query, bson.M{"publicationStatus": *filter.PublicationStatus})
		}

		if filter.IsDeleted != nil && *filter.IsDeleted {
			maps.Copy(query, bson.M{"isDeleted": true})
		}

		if filter.WithPhotos != nil && *filter.WithPhotos {
			maps.Copy(query, bson.M{"images": bson.M{"$exists": true, "$ne": bson.A{}}})
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
		return []*estate_entity.Complex{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case estate_entity.ComplexSortTitleAsc:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	case estate_entity.ComplexSortTitleDesc:
		opts.SetSort(bson.D{{Key: "title", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	}

	cursor, err := r.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*estate_entity.Complex
	for cursor.Next(ctx) {
		var dao *estate_mongodb_dao.ComplexDAO
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

func (r *complexRepository) GetByID(ctx context.Context, id string) (*estate_entity.Complex, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.collection.FindOne(ctx, query)

	var dao *estate_mongodb_dao.ComplexDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *complexRepository) Create(ctx context.Context, input estate_entity.Complex) (*estate_entity.Complex, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(estate_mongodb_dao.ComplexDAO).FromEntity(input)
	dao.ID = primitive.NewObjectID()

	res, err := r.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneComplexCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeComplexCreate
	}

	return dao.ToEntity(), nil
}

func (r *complexRepository) Update(ctx context.Context, id string, input estate_entity.Complex) (*estate_entity.Complex, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(estate_mongodb_dao.ComplexDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDComplexUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeComplexUpdate
	}

	return dao.ToEntity(), nil
}

func (r *complexRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDComplexDelete
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocComplexDelete
	}

	return nil
}

func (r *complexRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDComplexBulkDelete
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.collection.UpdateMany(ctx, query, bson.M{"$set": bson.M{"isDeleted": true}}); err != nil {
		return errs.ErrUpdateManyComplexBulkDelete
	}

	return nil
}

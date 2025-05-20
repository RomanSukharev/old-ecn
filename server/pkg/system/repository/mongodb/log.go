package system_mongodb

import (
	"context"
	"maps"
	"time"

	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	system_repository "github.com/pinks-agency/ecn/server/pkg/system/repository"
	system_mongodb_dao "github.com/pinks-agency/ecn/server/pkg/system/repository/mongodb/dao"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type logRepository struct {
	collection *mongo.Collection
}

func NewLogRepository(db *mongo.Database) system_repository.ILogDataRepository {
	collection := db.Collection("logs")

	indexes := mongo.IndexModel{Keys: bson.D{
		{Key: "title", Value: "text"},
		{Key: "details", Value: "text"},
	}}
	collection.Indexes().CreateOne(context.TODO(), indexes)

	return &logRepository{
		collection: collection,
	}
}

func (r *logRepository) Search(ctx context.Context, skip *int, limit *int, sort system_entity.LogSort, filter *system_entity.LogFilter) ([]*system_entity.Log, int, error) {
	// Set operation timeout
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{}

	// Enrich query with filters
	if filter != nil {
		if filter.AuthorID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.AuthorID)
			if err == nil {
				maps.Copy(query, bson.M{"author": eid})
			}
		}

		if filter.Level != nil {
			maps.Copy(query, bson.M{"level": string(*filter.Level)})
		}

		if filter.Type != nil {
			maps.Copy(query, bson.M{"type": string(*filter.Type)})
		}

		if filter.Keyword != nil {
			maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
		}
	}

	// Count totals by filter
	total, err := r.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*system_entity.Log{}, 0, nil
	}

	// Set find options
	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case system_entity.LogSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case system_entity.LogSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	}

	// Query data
	cursor, err := r.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	// Prepare response
	var entities []*system_entity.Log
	for cursor.Next(ctx) {
		var dao *system_mongodb_dao.LogDAO
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

func (r *logRepository) GetByID(ctx context.Context, id string) (*system_entity.Log, error) {
	// Set operation timeout
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	// Prepare ObjectID
	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	// Fetch object by ID
	query := bson.M{"_id": entityId}
	doc := r.collection.FindOne(ctx, query)

	// Prepare result
	var dao *system_mongodb_dao.LogDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	// All done
	return dao.ToEntity(), nil
}

func (r *logRepository) Create(ctx context.Context, input system_entity.Log) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(system_mongodb_dao.LogDAO).FromEntity(input)

	_, err := r.collection.InsertOne(ctx, *dao)
	if err != nil {
		return err
	}

	return nil
}

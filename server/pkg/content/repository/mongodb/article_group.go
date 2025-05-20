package content_mongodb

import (
	"context"
	"maps"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	content_repository "github.com/pinks-agency/ecn/server/pkg/content/repository"
	content_mongodb_dao "github.com/pinks-agency/ecn/server/pkg/content/repository/mongodb/dao"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type articleGroupRepository struct {
	articleGroupCollection *mongo.Collection
}

func NewArticleGroupRepository(db *mongo.Database) content_repository.IArticleGroupDataRepository {
	articleGroupCollection := db.Collection("articleGroups")

	articleGroupCollection.Indexes().CreateOne(context.TODO(), mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}})

	return &articleGroupRepository{
		articleGroupCollection: articleGroupCollection,
	}
}

func (r *articleGroupRepository) Search(ctx context.Context, skip *int, limit *int, sort content_entity.ArticleGroupSort, filter *content_entity.ArticleGroupFilter) ([]*content_entity.ArticleGroup, int, error) {
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

	total, err := r.articleGroupCollection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*content_entity.ArticleGroup{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case content_entity.ArticleGroupSortTitleAsc:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	case content_entity.ArticleGroupSortTitleDesc:
		opts.SetSort(bson.D{{Key: "title", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	}

	cursor, err := r.articleGroupCollection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*content_entity.ArticleGroup
	for cursor.Next(ctx) {
		var dao *content_mongodb_dao.ArticleGroupDAO
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

func (r *articleGroupRepository) GetByID(ctx context.Context, id string) (*content_entity.ArticleGroup, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.articleGroupCollection.FindOne(ctx, query)

	var dao *content_mongodb_dao.ArticleGroupDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *articleGroupRepository) Create(ctx context.Context, input content_entity.ArticleGroup) (*content_entity.ArticleGroup, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(content_mongodb_dao.ArticleGroupDAO).FromEntity(input)

	res, err := r.articleGroupCollection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.articleGroupCollection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *articleGroupRepository) Update(ctx context.Context, id string, input content_entity.ArticleGroup) (*content_entity.ArticleGroup, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(content_mongodb_dao.ArticleGroupDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.articleGroupCollection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *articleGroupRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	query := bson.M{"_id": &entityId}
	if _, err := r.articleGroupCollection.DeleteOne(ctx, query); err != nil {
		return err
	}

	return nil
}

func (r *articleGroupRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return err
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.articleGroupCollection.DeleteMany(ctx, query); err != nil {
		return err
	}

	return nil
}

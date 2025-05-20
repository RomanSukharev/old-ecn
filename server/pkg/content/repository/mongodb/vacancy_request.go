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

type vacancyRequestRepository struct {
	vacancyRequestCollection *mongo.Collection
}

func NewVacancyRequestRepository(db *mongo.Database) content_repository.IVacancyRequestDataRepository {
	vacancyRequestCollection := db.Collection("vacancyRequests")

	vacancyRequestCollection.Indexes().CreateOne(context.TODO(), mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}})

	return &vacancyRequestRepository{
		vacancyRequestCollection: vacancyRequestCollection,
	}
}

func (r *vacancyRequestRepository) Search(ctx context.Context, skip *int, limit *int, sort content_entity.VacancyRequestSort, filter *content_entity.VacancyRequestFilter) ([]*content_entity.VacancyRequest, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{}

	// Enrich query with filters
	if filter != nil {
		if filter.VacancyID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.VacancyID)
			if err == nil {
				maps.Copy(query, bson.M{"vacancy": eid})
			}
		}

		if filter.Status != nil {
			maps.Copy(query, bson.M{"status": *filter.Status})
		}

		if filter.Keyword != nil {
			maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
		}
	}

	total, err := r.vacancyRequestCollection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*content_entity.VacancyRequest{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case content_entity.VacancyRequestSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case content_entity.VacancyRequestSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := r.vacancyRequestCollection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*content_entity.VacancyRequest
	for cursor.Next(ctx) {
		var dao *content_mongodb_dao.VacancyRequestDAO
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

func (r *vacancyRequestRepository) GetByID(ctx context.Context, id string) (*content_entity.VacancyRequest, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.vacancyRequestCollection.FindOne(ctx, query)

	var dao *content_mongodb_dao.VacancyRequestDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *vacancyRequestRepository) Create(ctx context.Context, input content_entity.VacancyRequest) (*content_entity.VacancyRequest, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(content_mongodb_dao.VacancyRequestDAO).FromEntity(input)

	res, err := r.vacancyRequestCollection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.vacancyRequestCollection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *vacancyRequestRepository) Update(ctx context.Context, id string, input content_entity.VacancyRequest) (*content_entity.VacancyRequest, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(content_mongodb_dao.VacancyRequestDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.vacancyRequestCollection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *vacancyRequestRepository) Approve(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	query := bson.M{"_id": &entityId}
	update := bson.M{"$set": bson.M{"status": content_entity.VacancyRequestStatusApproved}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.vacancyRequestCollection.FindOneAndUpdate(ctx, query, update, opts)
	if err := doc.Err(); err != nil {
		return err
	}

	return nil
}

func (r *vacancyRequestRepository) Decline(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	query := bson.M{"_id": &entityId}
	update := bson.M{"$set": bson.M{"status": content_entity.VacancyRequestStatusDeclined}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.vacancyRequestCollection.FindOneAndUpdate(ctx, query, update, opts)
	if err := doc.Err(); err != nil {
		return err
	}

	return nil
}

func (r *vacancyRequestRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	query := bson.M{"_id": &entityId}
	if _, err := r.vacancyRequestCollection.DeleteOne(ctx, query); err != nil {
		return err
	}

	return nil
}

func (r *vacancyRequestRepository) BulkDelete(ctx context.Context, ids []string) error {
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
	if _, err := r.vacancyRequestCollection.DeleteMany(ctx, query); err != nil {
		return err
	}

	return nil
}

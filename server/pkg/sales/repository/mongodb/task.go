package sales_mongodb

import (
	"context"
	"maps"
	"sync"
	"time"

	"github.com/pinks-agency/ecn/server/pkg/errs"
	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	sales_repository "github.com/pinks-agency/ecn/server/pkg/sales/repository"
	sales_mongodb_dao "github.com/pinks-agency/ecn/server/pkg/sales/repository/mongodb/dao"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type taskRepository struct {
	collection *mongo.Collection
	counter    int
	mu         sync.Mutex
}

func NewTaskRepository(db *mongo.Database) sales_repository.ITasksDataRepository {

	collection := db.Collection("tasks")

	textIndex := mongo.IndexModel{Keys: bson.D{
		{Key: "title", Value: "text"},
	}}

	incrementIndex := mongo.IndexModel{Keys: bson.M{"internalNumber": 1}, Options: options.Index().SetUnique(true)}

	indexes := make([]mongo.IndexModel, 0, 2)
	indexes = append(indexes, incrementIndex, textIndex)

	collection.Indexes().CreateMany(context.Background(), indexes)

	return &taskRepository{
		collection: collection,
	}
}

func (t *taskRepository) Search(ctx context.Context, skip *int, limit *int, sort sales_entity.TaskSort, filter *sales_entity.TaskFilter) ([]*sales_entity.Task, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{"isDeleted": bson.M{"$ne": true}}

	if filter != nil {

		if filter.Keyword != nil {
			maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
		}

		if filter.Status != nil {
			maps.Copy(query, bson.M{"status": *filter.Status})
		}

		if filter.Assignee != nil {
			if eid, err := utils.ObjectIDFromString(filter.Assignee); err == nil {
				maps.Copy(query, bson.M{"assignee": eid})
			}
		}

		if filter.Reporter != nil {
			if eid, err := utils.ObjectIDFromString(filter.Reporter); err == nil {
				maps.Copy(query, bson.M{"reporter": eid})
			}
		}

		if filter.Deal != nil {
			if eid, err := utils.ObjectIDFromString(filter.Deal); err == nil {
				maps.Copy(query, bson.M{"deal": eid})
			}
		}

		if filter.Contact != nil {
			if eid, err := utils.ObjectIDFromString(filter.Contact); err == nil {
				maps.Copy(query, bson.M{"contact": eid})
			}
		}

		if filter.Lead != nil {
			if eid, err := utils.ObjectIDFromString(filter.Lead); err == nil {
				maps.Copy(query, bson.M{"lead": eid})
			}
		}

		if filter.Property != nil {
			if eid, err := utils.ObjectIDFromString(filter.Property); err == nil {
				maps.Copy(query, bson.M{"property": eid})
			}
		}

		if filter.Label != nil {
			maps.Copy(query, bson.M{"label": *filter.Label})
		}

		if filter.IsHot != nil {
			maps.Copy(query, bson.M{"isHot": *filter.IsHot})
		}

		if filter.Phone != nil {
			maps.Copy(query, bson.M{"phone": *filter.Phone})
		}

		if !filter.CreatedAtMax.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$lte": filter.CreatedAtMax}})
		}

		if !filter.CreatedAtMin.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$gte": filter.CreatedAtMin}})
		}
	}

	total, err := t.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*sales_entity.Task{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case sales_entity.TaskSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case sales_entity.TaskSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := t.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*sales_entity.Task

	for cursor.Next(ctx) {
		var dao sales_mongodb_dao.TaskDAO
		if err := cursor.Decode(&dao); err != nil {
			return nil, 0, err
		}

		entities = append(entities, dao.ToEntity())
	}

	if err := cursor.Err(); err != nil {
		return nil, 0, err
	}

	return entities, int(total), nil
}

func (t *taskRepository) GetByID(ctx context.Context, id string) (*sales_entity.Task, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := t.collection.FindOne(ctx, query)

	var dao *sales_mongodb_dao.TaskDAO

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (t *taskRepository) Create(ctx context.Context, input sales_entity.Task) (*sales_entity.Task, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.TaskDAO).FromEntity(input)

	res, err := t.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneTaskCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := t.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeTaskCreate
	}

	return dao.ToEntity(), nil
}

func (t *taskRepository) Update(ctx context.Context, id string, input sales_entity.Task) (*sales_entity.Task, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.TaskDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDTaskUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := t.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeTaskUpdate
	}

	return dao.ToEntity(), nil
}

func (t *taskRepository) Delete(ctx context.Context, id string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDTaskDelete
	}

	query := bson.M{"_id": entityId}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := t.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocTaskDelete
	}

	return nil
}

func (t *taskRepository) Complete(ctx context.Context, id string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDTaskComplete
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": bson.M{
		"isCompleted": true,
		"status":      sales_entity.TaskStatusCompleted,
		"endDate":     time.Now()}}

	if _, err := t.collection.UpdateOne(ctx, query, update); err != nil {
		return errs.ErrUpdateOneTaskComplete
	}

	return nil
}

func (t *taskRepository) BulkDelete(ctx context.Context, ids []string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIDs, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDTaskBulkDelete
	}

	query := bson.M{"_id": bson.M{"$in": entityIDs}}
	update := bson.M{"$set": bson.M{"isDeleted": true}}

	if _, err := t.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyTaskBulkDelete
	}

	return nil
}

func (t *taskRepository) BulkComplete(ctx context.Context, ids []string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDTaskBulkComplete
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{
		"isCompleted": true,
		"status":      sales_entity.TaskStatusCompleted,
		"endDate":     time.Now()}}

	if _, err := t.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyTaskBulkComplete
	}

	return nil
}

func (t *taskRepository) GetNextInternalNumber(ctx context.Context) (int, error) {

	t.mu.Lock()
	defer t.mu.Unlock()

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	if t.counter != 0 {
		t.counter++
		return t.counter, nil
	}

	const internalNumber string = "internalNumber"
	const defaultIncrement int = 1

	opts := options.FindOptions{}

	opts.SetSort(bson.D{{Key: internalNumber, Value: -1}})
	opts.SetLimit(1)

	cursor, err := t.collection.Find(ctx, bson.M{}, &opts)
	if err != nil {
		return 0, err
	}

	var data bson.M
	if cursor.Next(ctx) {
		if err := cursor.Decode(&data); err != nil {
			return 0, err
		}
	}

	if err := cursor.Err(); err != nil {
		return 0, err
	}

	maxInternalNumber, ok := data[internalNumber].(int32)
	if !ok {
		t.counter = defaultIncrement
	} else {
		t.counter = int(maxInternalNumber)
		t.counter++
	}

	return t.counter, nil
}

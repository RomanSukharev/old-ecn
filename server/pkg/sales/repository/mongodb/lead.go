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

type leadRepository struct {
	collection *mongo.Collection
	counter    int
	mu         sync.Mutex
}

func NewLeadRepository(db *mongo.Database) sales_repository.ILeadsDataRepository {

	collection := db.Collection("leads")

	textIndex := mongo.IndexModel{Keys: bson.D{
		{Key: "name", Value: "text"},
		{Key: "surname", Value: "text"},
		{Key: "patronymic", Value: "text"},
	}}

	incrementIndex := mongo.IndexModel{Keys: bson.M{"internalNumber": 1}, Options: options.Index().SetUnique(true)}

	indexes := make([]mongo.IndexModel, 0, 2)
	indexes = append(indexes, textIndex, incrementIndex)

	collection.Indexes().CreateMany(context.Background(), indexes)

	return &leadRepository{
		collection: collection,
	}
}

func (l *leadRepository) Search(ctx context.Context, skip *int, limit *int, sort sales_entity.LeadSort, filter *sales_entity.LeadFilter) ([]*sales_entity.Lead, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{"isDeleted": bson.M{"$ne": true}}

	if filter != nil {

		if filter.Keyword != nil {
			maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
		}

		if filter.Phone != nil {
			maps.Copy(query, bson.M{"phone": *filter.Phone})
		}

		if filter.Email != nil {
			maps.Copy(query, bson.M{"email": *filter.Email})
		}

		if filter.Company != nil {
			maps.Copy(query, bson.M{"company": *filter.Company})
		}

		if filter.Type != nil {
			maps.Copy(query, bson.M{"type": *filter.Type})
		}

		if filter.Status != nil {
			maps.Copy(query, bson.M{"status": *filter.Status})
		}

		if !filter.CreatedAtMax.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$lte": filter.CreatedAtMax}})
		}

		if !filter.CreatedAtMin.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$gte": filter.CreatedAtMin}})
		}
	}

	total, err := l.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*sales_entity.Lead{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case sales_entity.LeadSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case sales_entity.LeadSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := l.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*sales_entity.Lead

	for cursor.Next(ctx) {
		var dao sales_mongodb_dao.LeadDAO
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

func (l *leadRepository) Create(ctx context.Context, input sales_entity.Lead) (*sales_entity.Lead, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.LeadDAO).FromEntity(input)

	res, err := l.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneLeadCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := l.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeLeadCreate
	}

	return dao.ToEntity(), nil
}

func (l *leadRepository) GetByID(ctx context.Context, id string) (*sales_entity.Lead, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := l.collection.FindOne(ctx, query)

	var dao *sales_mongodb_dao.LeadDAO

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (l *leadRepository) Update(ctx context.Context, id string, input sales_entity.Lead) (*sales_entity.Lead, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.LeadDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDLeadUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := l.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeLeadUpdate
	}

	return dao.ToEntity(), nil
}

func (l *leadRepository) Delete(ctx context.Context, id string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDLeadDelete
	}

	query := bson.M{"_id": entityId}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := l.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocLeadDelete
	}

	return nil
}

func (l *leadRepository) ChangeStatus(ctx context.Context, id string, status string, comment *string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDLeadChangeStatus
	}

	query := bson.M{"_id": eid}

	update := bson.M{"$set": bson.M{"status": status, "updatedAt": time.Now()}}
	if comment != nil {
		maps.Copy(update, bson.M{"$set": bson.M{"comment": *comment}})
	}

	if _, err := l.collection.UpdateOne(ctx, query, update); err != nil {
		return errs.ErrUpdateOneLeadChangeStatus
	}

	return nil
}

func (l *leadRepository) BulkDelete(ctx context.Context, ids []string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIDs := make([]primitive.ObjectID, 0, len(ids))

	for _, id := range ids {
		entityId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return errs.ErrConvertIDLeadBulkDelete
		}
		entityIDs = append(entityIDs, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIDs}}
	update := bson.M{"$set": bson.M{"isDeleted": true}}

	if _, err := l.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyLeadBulkDelete
	}

	return nil
}

func (l *leadRepository) BulkChangeStatus(ctx context.Context, ids []string, status string, comment *string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDLeadBulkChangeStatus
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"status": status, "updatedAt": time.Now()}}

	if comment != nil {
		maps.Copy(update, bson.M{"$set": bson.M{"comment": *comment}})
	}
	if _, err := l.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyLeadBulkChangeStatus
	}

	return nil
}

func (l *leadRepository) GetNextInternalNumber(ctx context.Context) (int, error) {

	l.mu.Lock()
	defer l.mu.Unlock()

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	if l.counter != 0 {
		l.counter++
		return l.counter, nil
	}

	const internalNumber string = "internalNumber"
	const defaultIncrement int = 1

	opts := options.FindOptions{}

	opts.SetSort(bson.D{{Key: internalNumber, Value: -1}})
	opts.SetLimit(1)

	cursor, err := l.collection.Find(ctx, bson.M{}, &opts)
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
		l.counter = defaultIncrement
	} else {
		l.counter = int(maxInternalNumber)
		l.counter++
	}

	return l.counter, nil
}

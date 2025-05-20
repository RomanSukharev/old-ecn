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

type contactRepository struct {
	collection *mongo.Collection
	counter    int
	mu         sync.Mutex
}

func NewContactRepository(db *mongo.Database) sales_repository.IContactsDataRepository {
	collection := db.Collection("contacts")

	textIndex := mongo.IndexModel{Keys: bson.D{
		{Key: "name", Value: "text"},
		{Key: "surname", Value: "text"},
		{Key: "patronymic", Value: "text"},
	}}

	incrementIndex := mongo.IndexModel{Keys: bson.M{"internalNumber": 1}, Options: options.Index().SetUnique(true)}

	indexes := make([]mongo.IndexModel, 0, 2)
	indexes = append(indexes, textIndex, incrementIndex)

	collection.Indexes().CreateMany(context.Background(), indexes)

	return &contactRepository{
		collection: collection,
	}
}

func (c *contactRepository) Search(ctx context.Context, skip *int, limit *int, sort sales_entity.ContactSort, filter *sales_entity.ContactFilter) ([]*sales_entity.Contact, int, error) {

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

		if filter.Type != nil {
			maps.Copy(query, bson.M{"type": *filter.Type})
		}

		if filter.Company != nil {
			companyQuery := bson.M{"company": bson.M{"$regex": *filter.Company, "$options": "i"}}
			maps.Copy(query, companyQuery)
		}

		if filter.Address != nil {
			maps.Copy(query, bson.M{"address": *filter.Address})
		}

		if filter.Employee != nil {
			if eid, err := utils.ObjectIDFromString(filter.Employee); err == nil {
				queryEmployee := bson.M{"agents": bson.M{"$in": []primitive.ObjectID{*eid}}}
				maps.Copy(query, queryEmployee)
			}
		}

		if !filter.CreatedAtMax.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$lte": filter.CreatedAtMax}})
		}

		if !filter.CreatedAtMin.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$gte": filter.CreatedAtMin}})
		}
	}

	total, err := c.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*sales_entity.Contact{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case sales_entity.ContactSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case sales_entity.ContactSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := c.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*sales_entity.Contact

	for cursor.Next(ctx) {
		var dao sales_mongodb_dao.ContactDAO
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

func (c *contactRepository) GetByID(ctx context.Context, id string) (*sales_entity.Contact, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := c.collection.FindOne(ctx, query)

	var dao *sales_mongodb_dao.ContactDAO

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (c *contactRepository) Create(ctx context.Context, input sales_entity.Contact) (*sales_entity.Contact, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.ContactDAO).FromEntity(input)

	res, err := c.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneContactCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := c.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeContactCreate
	}

	return dao.ToEntity(), nil
}

func (c *contactRepository) Update(ctx context.Context, id string, input sales_entity.Contact) (*sales_entity.Contact, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.ContactDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDConctactUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := c.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeContactUpdate
	}

	return dao.ToEntity(), nil
}

func (c *contactRepository) Delete(ctx context.Context, id string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDContactDelete
	}

	query := bson.M{"_id": entityId}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := c.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocContactDelete
	}

	return nil
}

func (c *contactRepository) BulkDelete(ctx context.Context, ids []string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIDs := make([]primitive.ObjectID, 0, len(ids))

	for _, id := range ids {
		entityId, err := primitive.ObjectIDFromHex(id)
		if err != nil {
			return errs.ErrConvertIDContactBulkDelete
		}
		entityIDs = append(entityIDs, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIDs}}
	update := bson.M{"$set": bson.M{"isDeleted": true}}

	if _, err := c.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyContactBulkDelete
	}

	return nil
}

func (c *contactRepository) GetNextInternalNumber(ctx context.Context) (int, error) {

	c.mu.Lock()
	defer c.mu.Unlock()

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	if c.counter != 0 {
		c.counter++
		return c.counter, nil
	}

	const internalNumber string = "internalNumber"
	const defaultIncrement int = 1

	opts := options.FindOptions{}

	opts.SetSort(bson.D{{Key: internalNumber, Value: -1}})
	opts.SetLimit(1)

	cursor, err := c.collection.Find(ctx, bson.M{}, &opts)
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
		c.counter = defaultIncrement
	} else {
		c.counter = int(maxInternalNumber)
		c.counter++
	}

	return c.counter, nil
}

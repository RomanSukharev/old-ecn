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

type meetRepository struct {
	collection *mongo.Collection
	counter    int
	mu         sync.Mutex
}

func NewMeetRepository(db *mongo.Database) sales_repository.IMeetsDataRepository {

	collection := db.Collection("meets")

	incrementIndex := mongo.IndexModel{Keys: bson.M{"internalNumber": 1}, Options: options.Index().SetUnique(true)}

	indexes := make([]mongo.IndexModel, 0, 2)
	indexes = append(indexes, incrementIndex)

	collection.Indexes().CreateMany(context.Background(), indexes)

	return &meetRepository{
		collection: collection,
	}
}

func (m *meetRepository) Search(ctx context.Context, skip *int, limit *int, sort sales_entity.MeetSort, filter *sales_entity.MeetFilter) ([]*sales_entity.Meet, int, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{"isDeleted": bson.M{"$ne": true}}

	if filter != nil {

		if filter.Keyword != nil {
			maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
		}

		if filter.Property != nil {
			if eid, err := utils.ObjectIDFromString(filter.Property); err == nil {
				maps.Copy(query, bson.M{"property": eid})
			}
		}

		if filter.SellerAgent != nil {
			if eid, err := utils.ObjectIDFromString(filter.SellerAgent); err == nil {
				maps.Copy(query, bson.M{"sellerAgent": eid})
			}
		}

		if filter.SellerContact != nil {
			if eid, err := utils.ObjectIDFromString(filter.SellerContact); err == nil {
				maps.Copy(query, bson.M{"sellerContact": eid})
			}
		}

		if filter.BuyerAgent != nil {
			if eid, err := utils.ObjectIDFromString(filter.BuyerAgent); err == nil {
				maps.Copy(query, bson.M{"buyerAgent": eid})
			}
		}

		if filter.BuyerContact != nil {
			if eid, err := utils.ObjectIDFromString(filter.BuyerContact); err == nil {
				maps.Copy(query, bson.M{"buyerContact": eid})
			}
		}

		if filter.DealType != nil {
			maps.Copy(query, bson.M{"dealType": *filter.DealType})
		}

		if filter.Type != nil {
			maps.Copy(query, bson.M{"type": *filter.Type})
		}

		if filter.Address != nil {
			maps.Copy(query, bson.M{"address": *filter.Address})
		}

		if filter.Phone != nil {
			maps.Copy(query, bson.M{"phone": *filter.Phone})
		}

		if len(filter.Status) != 0 {
			var orConditions []bson.M
			for _, status := range filter.Status {
				orConditions = append(orConditions, bson.M{"status": status})
			}
			maps.Copy(query, bson.M{"$or": orConditions})
		}

		if !filter.CreatedAtMax.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$lte": filter.CreatedAtMax}})
		}

		if !filter.CreatedAtMin.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$gte": filter.CreatedAtMin}})
		}
	}

	total, err := m.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*sales_entity.Meet{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case sales_entity.MeetSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case sales_entity.MeetSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := m.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*sales_entity.Meet

	for cursor.Next(ctx) {
		var dao sales_mongodb_dao.MeetDAO
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

func (m *meetRepository) GetByID(ctx context.Context, id string) (*sales_entity.Meet, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := m.collection.FindOne(ctx, query)

	var dao *sales_mongodb_dao.MeetDAO

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (m *meetRepository) Create(ctx context.Context, input sales_entity.Meet) (*sales_entity.Meet, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.MeetDAO).FromEntity(input)
	dao.ID = primitive.NewObjectID()

	res, err := m.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneMeetCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := m.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeMeetCreate
	}

	return dao.ToEntity(), nil
}

func (m *meetRepository) Update(ctx context.Context, id string, input sales_entity.Meet) (*sales_entity.Meet, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.MeetDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDMeetUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := m.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeMeetUpdate
	}

	return dao.ToEntity(), nil
}

func (m *meetRepository) Delete(ctx context.Context, id string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDMeetDelete
	}

	query := bson.M{"_id": entityId}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := m.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocMeetDelete
	}

	return nil
}

func (m *meetRepository) ChangeStatus(ctx context.Context, id string, status string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDMeetChangeStatus
	}

	query := bson.M{"_id": eid}

	update := bson.M{"$set": bson.M{"status": status, "updatedAt": time.Now()}}

	if _, err := m.collection.UpdateOne(ctx, query, update); err != nil {
		return errs.ErrUpdateOneMeetChangeStatus
	}

	return nil
}

func (m *meetRepository) BulkDelete(ctx context.Context, ids []string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIDs, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDMeetBulkDelete
	}

	query := bson.M{"_id": bson.M{"$in": entityIDs}}
	update := bson.M{"$set": bson.M{"isDeleted": true}}

	if _, err := m.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyMeetBulkDelete
	}

	return nil
}

func (m *meetRepository) BulkChangeStatus(ctx context.Context, ids []string, status string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return err
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"status": status, "updatedAt": time.Now()}}

	if _, err := m.collection.UpdateMany(ctx, query, update); err != nil {
		return err
	}

	return nil
}

func (m *meetRepository) GetNextInternalNumber(ctx context.Context) (int, error) {

	m.mu.Lock()
	defer m.mu.Unlock()

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	if m.counter != 0 {
		m.counter++
		return m.counter, nil
	}

	const internalNumber string = "internalNumber"
	const defaultIncrement int = 1

	opts := options.FindOptions{}

	opts.SetSort(bson.D{{Key: internalNumber, Value: -1}})
	opts.SetLimit(1)

	cursor, err := m.collection.Find(ctx, bson.M{}, &opts)
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
		m.counter = defaultIncrement
	} else {
		m.counter = int(maxInternalNumber)
		m.counter++
	}

	return m.counter, nil
}

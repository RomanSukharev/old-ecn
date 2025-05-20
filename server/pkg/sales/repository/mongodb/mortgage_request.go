package sales_mongodb

import (
	"context"
	"maps"
	"strconv"
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

type mortgageRequestRepository struct {
	collection *mongo.Collection
	counter    int
	mu         sync.Mutex
}

func NewMortgageRequestRepository(db *mongo.Database) sales_repository.IMortgageRequestsDataRepository {

	collection := db.Collection("mortgageRequests")

	textIndex := mongo.IndexModel{Keys: bson.D{
		{Key: "comment", Value: "text"},
	}}

	incrementIndex := mongo.IndexModel{Keys: bson.M{"internalNumber": 1}, Options: options.Index().SetUnique(true)}

	indexes := make([]mongo.IndexModel, 0, 2)
	indexes = append(indexes, incrementIndex, textIndex)

	collection.Indexes().CreateMany(context.Background(), indexes)

	return &mortgageRequestRepository{
		collection: collection,
	}
}

func (m *mortgageRequestRepository) Search(ctx context.Context, skip *int, limit *int, sort sales_entity.MortgageRequestSort, filter *sales_entity.MortgageRequestFilter) ([]*sales_entity.MortgageRequest, int, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{"isDeleted": bson.M{"$ne": true}}

	if filter != nil {

		if filter.Keyword != nil {
			if internalNumber, err := strconv.Atoi(*filter.Keyword); err == nil {
				maps.Copy(query, bson.M{"internalNumber": internalNumber})
			} else {
				maps.Copy(query, bson.M{"$text": bson.M{"$search": *filter.Keyword}})
			}
		}

		if filter.Status != nil {
			maps.Copy(query, bson.M{"status": *filter.Status})
		}

		if filter.MortgageBroker != nil {
			if eid, err := utils.ObjectIDFromString(filter.MortgageBroker); err == nil {
				maps.Copy(query, bson.M{"mortgageBroker": eid})
			}
		}

		if filter.Agent != nil {
			if eid, err := utils.ObjectIDFromString(filter.Agent); err == nil {
				maps.Copy(query, bson.M{"agent": eid})
			}
		}

		if filter.Contact != nil {
			if eid, err := utils.ObjectIDFromString(filter.Contact); err == nil {
				maps.Copy(query, bson.M{"contact": eid})
			}
		}

		if filter.Property != nil {
			if eid, err := utils.ObjectIDFromString(filter.Property); err == nil {
				maps.Copy(query, bson.M{"property": eid})
			}
		}

		if filter.Deal != nil {
			if eid, err := utils.ObjectIDFromString(filter.Deal); err == nil {
				maps.Copy(query, bson.M{"deal": eid})
			}
		}

		if filter.Amount != nil {
			maps.Copy(query, bson.M{"amount": *filter.Amount})
		}

		if filter.FirstDeposit != nil {
			maps.Copy(query, bson.M{"firstDeposit": *filter.FirstDeposit})
		}

		if filter.Percentage != nil {
			maps.Copy(query, bson.M{"percentage": *filter.Percentage})
		}

		if filter.Period != nil {
			maps.Copy(query, bson.M{"period": *filter.Period})
		}

		if !filter.SendDate.IsZero() {
			maps.Copy(query, bson.M{"sendDate": filter.SendDate})
		}

		if !filter.ResponseDate.IsZero() {
			maps.Copy(query, bson.M{"responseDate": filter.ResponseDate})
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
		return []*sales_entity.MortgageRequest{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case sales_entity.MortgageRequestCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case sales_entity.MortgageRequestCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := m.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*sales_entity.MortgageRequest

	for cursor.Next(ctx) {
		var dao sales_mongodb_dao.MortgageRequestDAO
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

func (m *mortgageRequestRepository) GetByID(ctx context.Context, id string) (*sales_entity.MortgageRequest, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := m.collection.FindOne(ctx, query)

	var dao *sales_mongodb_dao.MortgageRequestDAO

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (m *mortgageRequestRepository) Create(ctx context.Context, input sales_entity.MortgageRequest) (*sales_entity.MortgageRequest, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.MortgageRequestDAO).FromEntity(input)

	res, err := m.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneMortgageRequestCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := m.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeMortgageRequestCreate
	}

	return dao.ToEntity(), nil
}

func (m *mortgageRequestRepository) Update(ctx context.Context, id string, input sales_entity.MortgageRequest) (*sales_entity.MortgageRequest, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.MortgageRequestDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDMortgageRequestUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := m.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeMortgageRequestUpdate
	}

	return dao.ToEntity(), nil
}

func (m *mortgageRequestRepository) Delete(ctx context.Context, id string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDMortgageRequestDelete
	}

	query := bson.M{"_id": entityId}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := m.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocMortgageRequestDelete
	}

	return nil
}

func (m *mortgageRequestRepository) ChangeStatus(ctx context.Context, id string, status string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDMortgageRequestChangeStatus
	}

	query := bson.M{"_id": eid}

	update := bson.M{"$set": bson.M{"status": status, "updatedAt": time.Now()}}

	if _, err := m.collection.UpdateOne(ctx, query, update); err != nil {
		return errs.ErrUpdateOneMortgageRequestChangeStatus
	}

	return nil
}

func (m *mortgageRequestRepository) BulkDelete(ctx context.Context, ids []string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIDs, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDMortgageRequestBulkDelete
	}

	query := bson.M{"_id": bson.M{"$in": entityIDs}}
	update := bson.M{"$set": bson.M{"isDeleted": true}}

	if _, err := m.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyMortgageRequestBulkDelete
	}

	return nil
}

func (m *mortgageRequestRepository) BulkChangeStatus(ctx context.Context, ids []string, status string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDMortgageRequestBulkChangeStatus
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"status": status, "updatedAt": time.Now()}}

	if _, err := m.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyMortgageRequestBulkChangeStatus
	}

	return nil
}

func (m *mortgageRequestRepository) GetNextInternalNumber(ctx context.Context) (int, error) {

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

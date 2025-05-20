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

type dealRepository struct {
	collection *mongo.Collection
	counter    int
	mu         sync.Mutex
}

func NewDealRepositroy(db *mongo.Database) sales_repository.IDealsDataRepository {

	collection := db.Collection("deals")

	incrementIndex := mongo.IndexModel{Keys: bson.M{"internalNumber": 1}, Options: options.Index().SetUnique(true)}

	indexes := make([]mongo.IndexModel, 0, 2)
	indexes = append(indexes, incrementIndex)

	collection.Indexes().CreateMany(context.Background(), indexes)

	return &dealRepository{
		collection: collection,
	}
}

func (d *dealRepository) Search(ctx context.Context, skip *int, limit *int, sort sales_entity.DealSort, filter *sales_entity.DealFilter) ([]*sales_entity.Deal, int, error) {
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

		if filter.Type != nil {
			maps.Copy(query, bson.M{"type": *filter.Type})
		}

		if filter.Stage != nil {
			maps.Copy(query, bson.M{"stage": *filter.Stage})
		}

		if filter.IsDeleted != nil {
			maps.Copy(query, bson.M{"isDeleted": true})
		}

		if filter.Deal != nil {
			if eid, err := utils.ObjectIDFromString(filter.Deal); err == nil {
				maps.Copy(query, bson.M{"_id": *eid})
			}
		}

		if filter.Phone != nil {
			queryPhone := bson.M{"$or": []bson.M{
				{"sellerPhone": *filter.Phone},
				{"buyerPhone": *filter.Phone},
			}}
			maps.Copy(query, queryPhone)
		}

		if filter.Employee != nil {
			if eid, err := utils.ObjectIDFromString(filter.Employee); err == nil {
				queryEmployee := bson.M{"$or": []bson.M{
					{"sellerAgent": eid},
					{"buyerAgent": eid},
					{"lawer": eid},
					{"accountant": eid},
					{"mortgageBroker": eid},
				}}
				maps.Copy(query, queryEmployee)
			}
		}

		if filter.Contact != nil {
			if eid, err := utils.ObjectIDFromString(filter.Contact); err == nil {
				queryContact := bson.M{"$or": []bson.M{
					{"sellerContact": eid},
					{"buyerContact": eid},
				}}
				maps.Copy(query, queryContact)
			}
		}

		if !filter.CreatedAtMax.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$lte": filter.CreatedAtMax}})
		}

		if !filter.CreatedAtMin.IsZero() {
			maps.Copy(query, bson.M{"createdAt": bson.M{"$gte": filter.CreatedAtMin}})
		}

		if !filter.FinishedAtMax.IsZero() {
			maps.Copy(query, bson.M{"finishedAt": bson.M{"$lte": filter.FinishedAtMax}})
		}

		if !filter.FinishedAtMin.IsZero() {
			maps.Copy(query, bson.M{"finishedAt": bson.M{"$gte": filter.FinishedAtMin}})
		}
	}

	total, err := d.collection.CountDocuments(ctx, query)
	if err != nil {
		return nil, 0, err
	}

	if total == 0 {
		return []*sales_entity.Deal{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case sales_entity.DealSortCreatedAtAsc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	case sales_entity.DealSortCreatedAtDesc:
		opts.SetSort(bson.D{{Key: "createdAt", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "createdAt", Value: 1}})
	}

	cursor, err := d.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*sales_entity.Deal

	for cursor.Next(ctx) {
		var dao sales_mongodb_dao.DealDAO
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

func (d *dealRepository) GetByID(ctx context.Context, id string) (*sales_entity.Deal, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := d.collection.FindOne(ctx, query)

	var dao *sales_mongodb_dao.DealDAO

	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (d *dealRepository) Create(ctx context.Context, input sales_entity.Deal) (*sales_entity.Deal, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.DealDAO).FromEntity(input)

	res, err := d.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOneDealCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := d.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodeDealCreate
	}

	return dao.ToEntity(), nil
}

func (d *dealRepository) Update(ctx context.Context, id string, input sales_entity.Deal) (*sales_entity.Deal, error) {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(sales_mongodb_dao.DealDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDDealUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := d.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodeDealUpdate
	}

	return dao.ToEntity(), nil
}

func (d *dealRepository) Delete(ctx context.Context, id string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDDealDelete
	}

	query := bson.M{"_id": entityId}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)

	doc := d.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocDealDelete
	}

	return nil
}

func (d *dealRepository) ChangeStage(ctx context.Context, id string, stage string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDDealChangeStage
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": bson.M{"stage": stage, "updatedAt": time.Now()}}

	if _, err := d.collection.UpdateOne(ctx, query, update); err != nil {
		return errs.ErrUpdateOneDealChangeStage
	}

	return nil
}

func (d *dealRepository) BulkDelete(ctx context.Context, ids []string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIDs, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDDealBulkDelete
	}

	query := bson.M{"_id": bson.M{"$in": entityIDs}}
	update := bson.M{"$set": bson.M{"isDeleted": true}}

	if _, err := d.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyDealBulKDelete
	}

	return nil
}

func (d *dealRepository) BulkChangeStage(ctx context.Context, ids []string, stage string) error {

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds, err := utils.ObjectIDsFromStrings(ids)
	if err != nil {
		return errs.ErrConvertIDDealBulkChangeStage
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	update := bson.M{"$set": bson.M{"stage": stage, "updatedAt": time.Now()}}

	if _, err := d.collection.UpdateMany(ctx, query, update); err != nil {
		return errs.ErrUpdateManyDealBulkChangeStage
	}

	return nil
}

func (d *dealRepository) GetNextInternalNumber(ctx context.Context) (int, error) {

	d.mu.Lock()
	defer d.mu.Unlock()

	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	if d.counter != 0 {
		d.counter++
		return d.counter, nil
	}

	const internalNumber string = "internalNumber"
	const defaultIncrement int = 1

	opts := options.FindOptions{}

	opts.SetSort(bson.D{{Key: internalNumber, Value: -1}})
	opts.SetLimit(1)

	cursor, err := d.collection.Find(ctx, bson.M{}, &opts)
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
		d.counter = defaultIncrement
	} else {
		d.counter = int(maxInternalNumber)
		d.counter++
	}

	return d.counter, nil
}

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

type propertyRepository struct {
	collection *mongo.Collection
}

func NewPropertyRepository(db *mongo.Database) estate_repository.IPropertyDataRepository {
	collection := db.Collection("properties")

	indexes := mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}}
	collection.Indexes().CreateOne(context.TODO(), indexes)

	return &propertyRepository{
		collection: collection,
	}
}

func (r *propertyRepository) Search(ctx context.Context, skip *int, limit *int, sort estate_entity.PropertySort, filter *estate_entity.PropertyFilter) ([]*estate_entity.Property, int, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	var total int64 = 0

	query := bson.M{"isDeleted": bson.M{"$ne": true}}

	// Enrich query with filters
	if filter != nil {
		if filter.Deal != nil {
			maps.Copy(query, bson.M{"deal": *filter.Deal})
		}

		if filter.Type != nil {
			maps.Copy(query, bson.M{"type": *filter.Type})
		}

		if filter.SubType != nil {
			maps.Copy(query, bson.M{"subType": *filter.SubType})
		}

		if filter.FromDeveloper != nil {
			maps.Copy(query, bson.M{"fromDeveloper": *filter.FromDeveloper})
		}

		if filter.ComplexID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.ComplexID)
			if err == nil {
				maps.Copy(query, bson.M{"complex": eid})
			}
		}

		if filter.VillageID != nil {
			eid, err := primitive.ObjectIDFromHex(*filter.VillageID)
			if err == nil {
				maps.Copy(query, bson.M{"village": eid})
			}
		}

		if filter.IsHot != nil {
			maps.Copy(query, bson.M{"isHot": *filter.IsHot})
		}

		if filter.IsDeleted != nil && *filter.IsDeleted {
			maps.Copy(query, bson.M{"isDeleted": true})
		}

		if filter.IsStudio != nil && *filter.IsStudio {
			maps.Copy(query, bson.M{"subType": estate_entity.PropertySubTypeStudio})
		}

		if len(filter.Statuses) != 0 {
			maps.Copy(query, bson.M{"status": bson.M{"$in": filter.Statuses}})
		}

		if filter.MinRooms != nil || filter.MaxRooms != nil {
			roomsFilter := bson.M{}
			if filter.MinRooms != nil {
				maps.Copy(roomsFilter, bson.M{"$gte": *filter.MinRooms})
			}
			if filter.MaxRooms != nil {
				maps.Copy(roomsFilter, bson.M{"$lte": *filter.MaxRooms})
			}
			maps.Copy(query, bson.M{"rooms": roomsFilter})
		}

		if filter.MinPrice != nil || filter.MaxPrice != nil {
			priceFilter := bson.M{}
			if filter.MinPrice != nil {
				maps.Copy(priceFilter, bson.M{"$gte": *filter.MinPrice})
			}
			if filter.MaxPrice != nil {
				maps.Copy(priceFilter, bson.M{"$lte": *filter.MaxPrice})
			}
			maps.Copy(query, bson.M{"price": priceFilter})
		}

		if filter.MinPricePerMeter != nil || filter.MaxPricePerMeter != nil {
			priceFilter := bson.M{}
			if filter.MinPricePerMeter != nil {
				maps.Copy(priceFilter, bson.M{"$gte": *filter.MinPricePerMeter})
			}
			if filter.MaxPricePerMeter != nil {
				maps.Copy(priceFilter, bson.M{"$lte": *filter.MaxPricePerMeter})
			}
			maps.Copy(query, bson.M{"pricePerMeter": priceFilter})
		}

		if filter.MinPricePerAr != nil || filter.MaxPricePerAr != nil {
			priceFilter := bson.M{}
			if filter.MinPricePerAr != nil {
				maps.Copy(priceFilter, bson.M{"$gte": *filter.MinPricePerAr})
			}
			if filter.MaxPricePerAr != nil {
				maps.Copy(priceFilter, bson.M{"$lte": *filter.MaxPricePerAr})
			}
			maps.Copy(query, bson.M{"pricePerAr": priceFilter})
		}

		if filter.MinArea != nil || filter.MaxArea != nil {
			areaFilter := bson.M{}
			if filter.MinArea != nil {
				maps.Copy(areaFilter, bson.M{"$gte": *filter.MinArea})
			}
			if filter.MaxArea != nil {
				maps.Copy(areaFilter, bson.M{"$lte": *filter.MaxArea})
			}
			maps.Copy(query, bson.M{"area": areaFilter})
		}

		if filter.MinLandArea != nil || filter.MaxLandArea != nil {
			areaFilter := bson.M{}
			if filter.MinLandArea != nil {
				maps.Copy(areaFilter, bson.M{"$gte": *filter.MinLandArea})
			}
			if filter.MaxLandArea != nil {
				maps.Copy(areaFilter, bson.M{"$lte": *filter.MaxLandArea})
			}
			maps.Copy(query, bson.M{"landArea": areaFilter})
		}

		if filter.IsReady != nil {
			maps.Copy(query, bson.M{"isReady": *filter.IsReady})
		}

		if filter.InCity != nil {
			maps.Copy(query, bson.M{"inCity": *filter.InCity})
		}

		if filter.MinCityDistance != nil || filter.MaxCityDistance != nil {
			cityDistanceFilter := bson.M{}
			if filter.MinCityDistance != nil {
				maps.Copy(cityDistanceFilter, bson.M{"$gte": *filter.MinCityDistance})
			}
			if filter.MaxCityDistance != nil {
				maps.Copy(cityDistanceFilter, bson.M{"$lte": *filter.MaxCityDistance})
			}
			maps.Copy(query, bson.M{"cityDistance": cityDistanceFilter})
		}

		if !filter.MinCreatedAt.IsZero() || !filter.MaxCreatedAt.IsZero() {
			createdAtFilter := bson.M{}
			if !filter.MinCreatedAt.IsZero() {
				maps.Copy(createdAtFilter, bson.M{"$gte": filter.MinCreatedAt})
			}
			if !filter.MaxCreatedAt.IsZero() {
				maps.Copy(createdAtFilter, bson.M{"$lte": filter.MaxCreatedAt})
			}
			maps.Copy(query, bson.M{"createdAt": createdAtFilter})
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
		return []*estate_entity.Property{}, 0, nil
	}

	opts := options.FindOptions{}

	if skip != nil {
		opts.SetSkip(int64(*skip))
	}
	if limit != nil {
		opts.SetLimit(int64(*limit))
	}

	switch sort {
	case estate_entity.PropertySortTitleAsc:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	case estate_entity.PropertySortTitleDesc:
		opts.SetSort(bson.D{{Key: "title", Value: -1}})
	default:
		opts.SetSort(bson.D{{Key: "title", Value: 1}})
	}

	cursor, err := r.collection.Find(ctx, query, &opts)
	if err != nil {
		return nil, 0, err
	}
	defer cursor.Close(ctx)

	var entities []*estate_entity.Property
	for cursor.Next(ctx) {
		var dao *estate_mongodb_dao.PropertyDAO
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

func (r *propertyRepository) GetByID(ctx context.Context, id string) (*estate_entity.Property, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.collection.FindOne(ctx, query)

	var dao *estate_mongodb_dao.PropertyDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *propertyRepository) Create(ctx context.Context, input estate_entity.Property) (*estate_entity.Property, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(estate_mongodb_dao.PropertyDAO).FromEntity(input)

	res, err := r.collection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, errs.ErrInsertOnePropertyCreate
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.collection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, errs.ErrDecodePropertyCreate
	}

	return dao.ToEntity(), nil
}

func (r *propertyRepository) Update(ctx context.Context, id string, input estate_entity.Property) (*estate_entity.Property, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	dao := new(estate_mongodb_dao.PropertyDAO).FromEntity(input)
	dao.ID = primitive.NilObjectID

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, errs.ErrConvertIDPropertyUpdate
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": *dao}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Decode(&dao); err != nil {
		return nil, errs.ErrDecodePropertyUpdate
	}

	return dao.ToEntity(), nil
}

func (r *propertyRepository) ChangeStatus(ctx context.Context, id string, status estate_entity.PropertyStatus) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDPropertyChangeStatus
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": bson.M{"status": status}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocPropertyChangeStatus
	}

	return nil
}

func (r *propertyRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDPropertyDelete
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": bson.M{"isDeleted": true}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocPropertyDelete
	}

	return nil
}

func (r *propertyRepository) Refresh(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	eid, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return errs.ErrConvertIDPropertyRefresh
	}

	query := bson.M{"_id": eid}
	update := bson.M{"$set": bson.M{"refreshDate": time.Now()}}
	opts := options.FindOneAndUpdate().SetReturnDocument(options.After)
	doc := r.collection.FindOneAndUpdate(ctx, query, update, opts)

	if err := doc.Err(); err != nil {
		return errs.ErrDocPropertyRefresh
	}

	return nil
}

func (r *propertyRepository) BulkDelete(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDPropertyBulkDelete
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.collection.UpdateMany(ctx, query, bson.M{"$set": bson.M{"isDeleted": true}}); err != nil {
		return errs.ErrUpdateManyPropertyBulkDelete
	}

	return nil
}

func (r *propertyRepository) BulkChangeStatus(ctx context.Context, ids []string, status estate_entity.PropertyStatus) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDPropertyBulkChangeStatus
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.collection.UpdateMany(ctx, query, bson.M{"$set": bson.M{"status": status}}); err != nil {
		return errs.ErrUpdateManyPropertyBulkChangeStatus
	}

	return nil
}

func (r *propertyRepository) BulkRefresh(ctx context.Context, ids []string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityIds := make([]primitive.ObjectID, 0, len(ids))

	for _, v := range ids {
		entityId, err := primitive.ObjectIDFromHex(v)
		if err != nil {
			return errs.ErrConvertIDPropertyBulkRefresh
		}
		entityIds = append(entityIds, entityId)
	}

	query := bson.M{"_id": bson.M{"$in": entityIds}}
	if _, err := r.collection.UpdateMany(ctx, query, bson.M{"$set": bson.M{"refreshDate": time.Now()}}); err != nil {
		return errs.ErrUpdateManyPropertyBulkRefresh
	}

	return nil
}

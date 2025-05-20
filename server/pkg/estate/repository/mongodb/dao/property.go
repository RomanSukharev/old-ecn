package estate_mongodb_dao

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PropertyDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	InternalID      *int                            `bson:"internalID,omitempty"`
	Deal            *estate_entity.Deal             `bson:"deal,omitempty"`
	Type            *estate_entity.PropertyType     `bson:"type,omitempty"`
	SubType         *estate_entity.PropertySubType  `bson:"subType,omitempty"`
	CommercialUsage []estate_entity.CommercialUsage `bson:"commercialUsage"`

	FromDeveloper *bool `bson:"fromDeveloper,omitempty"`

	InComplex      *bool               `bson:"inComplex,omitempty"`
	ComplexID      *primitive.ObjectID `bson:"complex,omitempty"`
	ComplexHouseID *primitive.ObjectID `bson:"complexHouse,omitempty"`

	InVillage *bool               `bson:"inVillage,omitempty"`
	VillageID *primitive.ObjectID `bson:"village,omitempty"`

	IsHot *bool `bson:"isHot,omitempty"`

	Title         *string  `bson:"title,omitempty"`
	Description   *string  `bson:"description,omitempty"`
	Address       *string  `bson:"address,omitempty"`
	Lat           *float64 `bson:"lat,omitempty"`
	Lon           *float64 `bson:"lon,omitempty"`
	CadastrNumber *string  `bson:"cadastrNumber,omitempty"`
	SeoText       *string  `bson:"seoText,omitempty"`
	YoutubeLink   *string  `bson:"youtubeLink,omitempty"`
	TourLink      *string  `bson:"tourLink,omitempty"`

	DocumentIDs []primitive.ObjectID `bson:"documents"`
	ImageIDs    []primitive.ObjectID `bson:"images"`

	IsDeleted   *bool     `bson:"isDeleted,omitempty"`
	IsEditable  *bool     `bson:"isEditable,omitempty"`
	RefreshDate time.Time `bson:"refreshDate,omitempty"`

	Status *estate_entity.PropertyStatus `bson:"status,omitempty"`

	Price         *float64  `bson:"price,omitempty"`
	PricePerMeter *float64  `bson:"pricePerMeter,omitempty"`
	PricePerAr    *float64  `bson:"pricePerAr,omitempty"`
	PriceHistory  []float64 `bson:"priceHistory,omitempty"`

	IsReady          *bool                  `bson:"isReady,omitempty"`
	ReadinessYear    *int                   `bson:"readinessYear,omitempty"`
	ReadinessQuarter *estate_entity.Quarter `bson:"readinessQuarter,omitempty"`

	InCity       *bool   `bson:"inCity,omitempty"`
	CityDistance *int    `bson:"cityDistance,omitempty"`
	Region       *string `bson:"region,omitempty"`
	SubRegion    *string `bson:"subRegion,omitempty"`

	Source *estate_entity.PropertySource `bson:"source,omitempty"`

	Rooms         *int                      `bson:"rooms,omitempty"`
	Area          *float64                  `bson:"area,omitempty"`
	LandArea      *float64                  `bson:"landArea,omitempty"`
	LivingArea    *float64                  `bson:"livingArea,omitempty"`
	KitchenArea   *float64                  `bson:"kitchenArea,omitempty"`
	ToiletType    *estate_entity.ToiletType `bson:"toiletType,omitempty"`
	RehabType     *estate_entity.RehabType  `bson:"rehabType,omitempty"`
	Floor         *int                      `bson:"floor,omitempty"`
	Floors        *int                      `bson:"floors,omitempty"`
	CeilingHeight *float64                  `bson:"ceilingHeight,omitempty"`

	InternalInfo *string `bson:"internalInfo,omitempty"`

	ComissionPercent *float64 `bson:"comissionPercent,omitempty"`
	ComissionAmount  *float64 `bson:"comissionAmount,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *PropertyDAO) FromEntity(entity estate_entity.Property) *PropertyDAO {
	// Prepare result
	*dao = PropertyDAO{
		InternalID:      entity.InternalID,
		Deal:            entity.Deal,
		Type:            entity.Type,
		SubType:         entity.SubType,
		CommercialUsage: entity.CommercialUsage,

		FromDeveloper: entity.FromDeveloper,

		InComplex: entity.InComplex,
		InVillage: entity.InVillage,

		IsHot: entity.IsHot,

		Title:         entity.Title,
		Description:   entity.Description,
		Address:       entity.Address,
		Lat:           entity.Lat,
		Lon:           entity.Lon,
		CadastrNumber: entity.CadastrNumber,
		SeoText:       entity.SeoText,
		YoutubeLink:   entity.YoutubeLink,
		TourLink:      entity.TourLink,

		IsDeleted:   entity.IsDeleted,
		IsEditable:  entity.IsEditable,
		RefreshDate: entity.RefreshDate,

		Status: entity.Status,

		Price:         entity.Price,
		PricePerMeter: entity.PricePerMeter,
		PricePerAr:    entity.PricePerAr,
		PriceHistory:  entity.PriceHistory,

		IsReady:          entity.IsReady,
		ReadinessYear:    entity.ReadinessYear,
		ReadinessQuarter: entity.ReadinessQuarter,

		InCity:       entity.InCity,
		CityDistance: entity.CityDistance,
		Region:       entity.Region,
		SubRegion:    entity.SubRegion,

		Source: entity.Source,

		Rooms:         entity.Rooms,
		Area:          entity.Area,
		LandArea:      entity.LandArea,
		LivingArea:    entity.LivingArea,
		KitchenArea:   entity.KitchenArea,
		ToiletType:    entity.ToiletType,
		RehabType:     entity.RehabType,
		Floor:         entity.Floor,
		Floors:        entity.Floors,
		CeilingHeight: entity.CeilingHeight,

		InternalInfo: entity.InternalInfo,

		ComissionPercent: entity.ComissionPercent,
		ComissionAmount:  entity.ComissionAmount,

		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.ComplexID); err == nil {
		dao.ComplexID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.ComplexHouseID); err == nil {
		dao.ComplexHouseID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.VillageID); err == nil {
		dao.VillageID = eid
	}

	if eid, err := utils.ObjectIDsFromStrings(entity.DocumentIDs); err == nil {
		dao.DocumentIDs = eid
	}

	if eid, err := utils.ObjectIDsFromStrings(entity.ImageIDs); err == nil {
		dao.ImageIDs = eid
	}

	// All done
	return dao
}

func (dao *PropertyDAO) ToEntity() *estate_entity.Property {
	// Prepare result
	return &estate_entity.Property{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},

		InternalID:      dao.InternalID,
		Deal:            dao.Deal,
		Type:            dao.Type,
		SubType:         dao.SubType,
		CommercialUsage: dao.CommercialUsage,

		FromDeveloper: dao.FromDeveloper,

		InComplex:      dao.InComplex,
		ComplexID:      utils.StringFromObjectID(dao.ComplexID),
		ComplexHouseID: utils.StringFromObjectID(dao.ComplexHouseID),

		InVillage: dao.InVillage,
		VillageID: utils.StringFromObjectID(dao.VillageID),

		IsHot: dao.IsHot,

		Title:         dao.Title,
		Description:   dao.Description,
		Address:       dao.Address,
		Lat:           dao.Lat,
		Lon:           dao.Lon,
		CadastrNumber: dao.CadastrNumber,
		SeoText:       dao.SeoText,
		YoutubeLink:   dao.YoutubeLink,
		TourLink:      dao.TourLink,

		DocumentIDs: utils.StringsFromObjectIDs(dao.DocumentIDs),
		ImageIDs:    utils.StringsFromObjectIDs(dao.ImageIDs),

		IsDeleted:   dao.IsDeleted,
		IsEditable:  dao.IsEditable,
		RefreshDate: dao.RefreshDate,

		Status: dao.Status,

		Price:         dao.Price,
		PricePerMeter: dao.PricePerMeter,
		PricePerAr:    dao.PricePerAr,
		PriceHistory:  dao.PriceHistory,

		IsReady:          dao.IsReady,
		ReadinessYear:    dao.ReadinessYear,
		ReadinessQuarter: dao.ReadinessQuarter,

		InCity:       dao.InCity,
		CityDistance: dao.CityDistance,
		Region:       dao.Region,
		SubRegion:    dao.SubRegion,

		Source: dao.Source,

		Rooms:         dao.Rooms,
		Area:          dao.Area,
		LandArea:      dao.LandArea,
		LivingArea:    dao.LivingArea,
		KitchenArea:   dao.KitchenArea,
		ToiletType:    dao.ToiletType,
		RehabType:     dao.RehabType,
		Floor:         dao.Floor,
		Floors:        dao.Floors,
		CeilingHeight: dao.CeilingHeight,

		InternalInfo: dao.InternalInfo,

		ComissionPercent: dao.ComissionPercent,
		ComissionAmount:  dao.ComissionAmount,
	}
}

package public_models

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Property struct {
	ID string `json:"id"`

	InternalID      *int                  `json:"internalId,omitempty"`
	Deal            *DealEnum             `json:"deal,omitempty"`
	Type            *PropertyTypeEnum     `json:"type,omitempty"`
	SubType         *PropertySubTypeEnum  `json:"subType,omitempty"`
	CommercialUsage []CommercialUsageEnum `json:"commercialUsage,omitempty"`

	FromDeveloper *bool `json:"fromDeveloper,omitempty"`

	InComplex      *bool   `json:"inComplex,omitempty"`
	ComplexID      *string `json:"-"`
	ComplexHouseID *string `json:"-"`

	InVillage *bool   `json:"inVillage,omitempty"`
	VillageID *string `json:"-"`

	IsHot *bool `json:"isHot,omitempty"`

	Title         *string  `json:"title,omitempty"`
	Description   *string  `json:"description,omitempty"`
	Address       *string  `json:"address,omitempty"`
	Lat           *float64 `json:"lat,omitempty"`
	Lon           *float64 `json:"lon,omitempty"`
	CadastrNumber *string  `json:"cadastrNumber,omitempty"`
	SeoText       *string  `json:"seoText,omitempty"`
	YoutubeLink   *string  `json:"youtubeLink,omitempty"`
	TourLink      *string  `json:"tourLink,omitempty"`

	DocumentIDs []string `json:"-"`
	ImageIDs    []string `json:"-"`

	IsDeleted   *bool     `json:"isDeleted"`
	RefreshDate time.Time `json:"refreshDate"`

	Status *PropertyStatusEnum `json:"status"`

	Price         *float64 `json:"price,omitempty"`
	PricePerMeter *float64 `json:"pricePerMeter,omitempty"`
	PricePerAr    *float64 `json:"pricePerAr,omitempty"`

	IsReady          *bool        `json:"isReady,omitempty"`
	ReadinessYear    *int         `json:"readinessYear,omitempty"`
	ReadinessQuarter *QuarterEnum `json:"readinessQuarter,omitempty"`

	InCity       *bool   `json:"inCity,omitempty"`
	CityDistance *int    `json:"cityDistance,omitempty"`
	Region       *string `json:"region,omitempty"`
	SubRegion    *string `json:"subRegion,omitempty"`

	Source *PropertySourceEnum `json:"source,omitempty"`

	Rooms         *int            `json:"rooms,omitempty"`
	Area          *float64        `json:"area,omitempty"`
	LandArea      *float64        `json:"landArea,omitempty"`
	LivingArea    *float64        `json:"livingArea,omitempty"`
	KitchenArea   *float64        `json:"kitchenArea,omitempty"`
	ToiletType    *ToiletTypeEnum `json:"toiletType,omitempty"`
	RehabType     *RehabTypeEnum  `json:"rehabType,omitempty"`
	Floor         *int            `json:"floor,omitempty"`
	Floors        *int            `json:"floors,omitempty"`
	CeilingHeight *float64        `json:"ceilingHeight,omitempty"`

	InternalInfo *string `json:"internalInfo,omitempty"`

	ComissionPercent *float64 `json:"comissionPercent,omitempty"`
	ComissionAmount  *float64 `json:"comissionAmount,omitempty"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (m *Property) FromEntity(e *estate_entity.Property) *Property {
	m = &Property{
		ID: e.ID,

		InternalID: e.InternalID,
		Deal:       (*DealEnum)(e.Deal),
		Type:       (*PropertyTypeEnum)(e.Type),
		SubType:    (*PropertySubTypeEnum)(e.SubType),

		FromDeveloper: e.FromDeveloper,

		InComplex:      e.InComplex,
		ComplexID:      e.ComplexID,
		ComplexHouseID: e.ComplexHouseID,

		InVillage: e.InVillage,
		VillageID: e.VillageID,

		IsHot: e.IsHot,

		Title:         e.Title,
		Description:   e.Description,
		Address:       e.Address,
		Lat:           e.Lat,
		Lon:           e.Lon,
		CadastrNumber: e.CadastrNumber,
		SeoText:       e.SeoText,
		YoutubeLink:   e.YoutubeLink,
		TourLink:      e.TourLink,

		DocumentIDs: e.DocumentIDs,
		ImageIDs:    e.ImageIDs,

		IsDeleted:   e.IsDeleted,
		RefreshDate: e.RefreshDate,

		Status: (*PropertyStatusEnum)(e.Status),

		Price:         e.Price,
		PricePerMeter: e.PricePerMeter,
		PricePerAr:    e.PricePerAr,

		IsReady:          e.IsReady,
		ReadinessYear:    e.ReadinessYear,
		ReadinessQuarter: (*QuarterEnum)(e.ReadinessQuarter),

		InCity:       e.InCity,
		CityDistance: e.CityDistance,
		Region:       e.Region,
		SubRegion:    e.SubRegion,

		Source: (*PropertySourceEnum)(e.Source),

		Rooms:         e.Rooms,
		Area:          e.Area,
		LandArea:      e.LandArea,
		LivingArea:    e.LivingArea,
		KitchenArea:   e.KitchenArea,
		ToiletType:    (*ToiletTypeEnum)(e.ToiletType),
		RehabType:     (*RehabTypeEnum)(e.RehabType),
		Floor:         e.Floor,
		Floors:        e.Floors,
		CeilingHeight: e.CeilingHeight,

		InternalInfo: e.InternalInfo,

		ComissionPercent: e.ComissionPercent,
		ComissionAmount:  e.ComissionAmount,

		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
	}

	for _, v := range e.CommercialUsage {
		m.CommercialUsage = append(m.CommercialUsage, CommercialUsageEnum(v))
	}

	return m
}

type PropertyInput struct {
	ID string `json:"id,omitempty"`

	Deal            *DealEnum             `json:"deal,omitempty"`
	Type            *PropertyTypeEnum     `json:"type,omitempty"`
	SubType         *PropertySubTypeEnum  `json:"subType,omitempty"`
	CommercialUsage []CommercialUsageEnum `json:"commercialUsage,omitempty"`

	FromDeveloper *bool `json:"fromDeveloper,omitempty"`

	InComplex      *bool   `json:"inComplex,omitempty"`
	ComplexID      *string `json:"-"`
	ComplexHouseID *string `json:"-"`

	InVillage *bool   `json:"inVillage,omitempty"`
	VillageID *string `json:"-"`

	IsHot *bool `json:"isHot,omitempty"`

	Title         *string  `json:"title"`
	Description   *string  `json:"description"`
	Address       *string  `json:"address,omitempty"`
	Lat           *float64 `json:"lat,omitempty"`
	Lon           *float64 `json:"lon,omitempty"`
	CadastrNumber *string  `json:"cadastrNumber,omitempty"`
	SeoText       *string  `json:"seoText,omitempty"`
	YoutubeLink   *string  `json:"youtubeLink,omitempty"`
	TourLink      *string  `json:"tourLink,omitempty"`

	DocumentIDs []string `json:"-"`
	ImageIDs    []string `json:"-"`

	Status *PropertyStatusEnum `json:"status"`

	Price *float64 `json:"price,omitempty"`

	IsReady          *bool        `json:"isReady,omitempty"`
	ReadinessYear    *int         `json:"readinessYear,omitempty"`
	ReadinessQuarter *QuarterEnum `json:"readinessQuarter,omitempty"`

	InCity       *bool   `json:"inCity,omitempty"`
	CityDistance *int    `json:"cityDistance,omitempty"`
	Region       *string `json:"region,omitempty"`
	SubRegion    *string `json:"subRegion,omitempty"`

	Source *PropertySourceEnum `json:"source,omitempty"`

	Rooms         *int            `json:"rooms,omitempty"`
	Area          *float64        `json:"area,omitempty"`
	LandArea      *float64        `json:"landArea,omitempty"`
	LivingArea    *float64        `json:"livingArea,omitempty"`
	KitchenArea   *float64        `json:"kitchenArea,omitempty"`
	ToiletType    *ToiletTypeEnum `json:"toiletType,omitempty"`
	RehabType     *RehabTypeEnum  `json:"rehabType,omitempty"`
	Floor         *int            `json:"floor,omitempty"`
	Floors        *int            `json:"floors,omitempty"`
	CeilingHeight *float64        `json:"ceilingHeight,omitempty"`

	InternalInfo *string `json:"internalInfo,omitempty"`

	ComissionPercent *float64 `json:"comissionPercent,omitempty"`
	ComissionAmount  *float64 `json:"comissionAmount,omitempty"`
}

func (m *PropertyInput) ToEntity() *estate_entity.Property {
	var commercialUsage []estate_entity.CommercialUsage
	for _, v := range m.CommercialUsage {
		commercialUsage = append(commercialUsage, estate_entity.CommercialUsage(v))
	}

	return &estate_entity.Property{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},

		Deal:            (*estate_entity.Deal)(m.Deal),
		Type:            (*estate_entity.PropertyType)(m.Type),
		SubType:         (*estate_entity.PropertySubType)(m.SubType),
		CommercialUsage: commercialUsage,

		FromDeveloper: m.FromDeveloper,

		InComplex:      m.InComplex,
		ComplexID:      m.ComplexID,
		ComplexHouseID: m.ComplexHouseID,

		InVillage: m.InVillage,
		VillageID: m.VillageID,

		IsHot: m.IsHot,

		Title:         m.Title,
		Description:   m.Description,
		Address:       m.Address,
		Lat:           m.Lat,
		Lon:           m.Lon,
		CadastrNumber: m.CadastrNumber,
		SeoText:       m.SeoText,
		YoutubeLink:   m.YoutubeLink,
		TourLink:      m.TourLink,

		DocumentIDs: m.DocumentIDs,
		ImageIDs:    m.ImageIDs,

		Status: (*estate_entity.PropertyStatus)(m.Status),

		Price: m.Price,

		IsReady:          m.IsReady,
		ReadinessYear:    m.ReadinessYear,
		ReadinessQuarter: (*estate_entity.Quarter)(m.ReadinessQuarter),

		InCity:       m.InCity,
		CityDistance: m.CityDistance,
		Region:       m.Region,
		SubRegion:    m.SubRegion,

		Source: (*estate_entity.PropertySource)(m.Source),

		Rooms:         m.Rooms,
		Area:          m.Area,
		LandArea:      m.LandArea,
		LivingArea:    m.LivingArea,
		KitchenArea:   m.KitchenArea,
		ToiletType:    (*estate_entity.ToiletType)(m.ToiletType),
		RehabType:     (*estate_entity.RehabType)(m.RehabType),
		Floor:         m.Floor,
		Floors:        m.Floors,
		CeilingHeight: m.CeilingHeight,

		InternalInfo: m.InternalInfo,

		ComissionPercent: m.ComissionPercent,
		ComissionAmount:  m.ComissionAmount,
	}
}

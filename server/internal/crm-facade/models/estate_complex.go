package crm_models

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Complex struct {
	ID string `json:"id"`

	Title         string   `json:"title,omitempty"`
	Description   string   `json:"description,omitempty"`
	Address       string   `json:"address,omitempty"`
	Lat           *float64 `json:"lat,omitempty"`
	Lon           *float64 `json:"lon,omitempty"`
	CadastrNumber *string  `json:"cadastrNumber,omitempty"`
	SeoText       *string  `json:"seoText,omitempty"`
	YoutubeLink   *string  `json:"youtubeLink,omitempty"`
	TourLink      *string  `json:"tourLink,omitempty"`

	InCity       *bool   `json:"inCity,omitempty"`
	CityDistance *int    `json:"cityDistance,omitempty"`
	Region       *string `json:"region,omitempty"`
	SubRegion    *string `json:"subRegion,omitempty"`

	DeveloperID *string `json:"-"`

	IsReady          *bool        `json:"isReady,omitempty"`
	ReadinessQuarter *QuarterEnum `json:"readinessQuarter,omitempty"`
	ReadinessYear    *int         `json:"readinessYear,omitempty"`

	ImageIDs              []string `json:"-"`
	DocumentIDs           []string `json:"-"`
	ProjectDeclarationIDs []string `json:"-"`

	PublicationStatus *PublicationStatusEnum `json:"publicationStatus,omitempty"`

	InternalInfo *string `json:"internalinfo,omitempty"`

	IsDeleted *bool `json:"isDeleted,omitempty"`

	CreatedAt time.Time `json:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
}

func (m *Complex) FromEntity(e *estate_entity.Complex) *Complex {
	m = &Complex{
		ID: e.ID,

		Title:         *e.Title,
		Description:   *e.Description,
		Address:       *e.Address,
		Lat:           e.Lat,
		Lon:           e.Lon,
		CadastrNumber: e.CadastrNumber,
		SeoText:       e.SeoText,
		YoutubeLink:   e.YoutubeLink,
		TourLink:      e.TourLink,

		InCity:       e.InCity,
		CityDistance: e.CityDistance,
		Region:       e.Region,
		SubRegion:    e.SubRegion,

		DeveloperID: e.DeveloperID,

		IsReady:          e.IsReady,
		ReadinessYear:    e.ReadinessYear,
		ReadinessQuarter: (*QuarterEnum)(e.ReadinessQuarter),

		ImageIDs:              e.ImageIDs,
		DocumentIDs:           e.DocumentIDs,
		ProjectDeclarationIDs: e.ProjectDeclarationIDs,

		PublicationStatus: (*PublicationStatusEnum)(e.PublicationStatus),

		InternalInfo: e.InternalInfo,

		IsDeleted: e.IsDeleted,

		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
	}

	return m
}

type ComplexInput struct {
	ID string `json:"id,omitempty"`

	Title         string   `json:"title,omitempty"`
	Description   string   `json:"description,omitempty"`
	Address       string   `json:"address,omitempty"`
	Lat           *float64 `json:"lat,omitempty"`
	Lon           *float64 `json:"lon,omitempty"`
	CadastrNumber *string  `json:"cadastrNumber,omitempty"`
	SeoText       *string  `json:"seoText,omitempty"`
	YoutubeLink   *string  `json:"youtubeLink,omitempty"`
	TourLink      *string  `json:"tourLink,omitempty"`

	InCity       *bool   `json:"inCity,omitempty"`
	CityDistance *int    `json:"cityDistance,omitempty"`
	Region       *string `json:"region,omitempty"`
	SubRegion    *string `json:"subRegion,omitempty"`

	DeveloperID *string `json:"-"`

	IsReady          *bool        `json:"isReady,omitempty"`
	ReadinessQuarter *QuarterEnum `json:"readinessQuarter,omitempty"`
	ReadinessYear    *int         `json:"readinessYear,omitempty"`

	ImageIDs              []string `json:"-"`
	DocumentIDs           []string `json:"-"`
	ProjectDeclarationIDs []string `json:"-"`

	PublicationStatus *PublicationStatusEnum `json:"publicationStatus,omitempty"`

	InternalInfo *string `json:"internalinfo,omitempty"`
}

func (m *ComplexInput) ToEntity() *estate_entity.Complex {
	return &estate_entity.Complex{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},

		Title:         &m.Title,
		Description:   &m.Description,
		Address:       &m.Address,
		Lat:           m.Lat,
		Lon:           m.Lon,
		CadastrNumber: m.CadastrNumber,
		SeoText:       m.SeoText,
		YoutubeLink:   m.YoutubeLink,
		TourLink:      m.TourLink,

		InCity:       m.InCity,
		CityDistance: m.CityDistance,
		Region:       m.Region,
		SubRegion:    m.SubRegion,

		DeveloperID: m.DeveloperID,

		IsReady:          m.IsReady,
		ReadinessQuarter: (*estate_entity.Quarter)(m.ReadinessQuarter),
		ReadinessYear:    m.ReadinessYear,

		ImageIDs:              m.ImageIDs,
		DocumentIDs:           m.DocumentIDs,
		ProjectDeclarationIDs: m.ProjectDeclarationIDs,

		PublicationStatus: (*shared_entity.PublicationStatus)(m.PublicationStatus),

		InternalInfo: m.InternalInfo,
	}
}

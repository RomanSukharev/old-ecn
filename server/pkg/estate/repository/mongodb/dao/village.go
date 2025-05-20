package estate_mongodb_dao

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type VillageDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	Title         *string  `bson:"title,omitempty"`
	Description   *string  `bson:"description,omitempty"`
	Address       *string  `bson:"address,omitempty"`
	Lat           *float64 `bson:"lat,omitempty"`
	Lon           *float64 `bson:"lon,omitempty"`
	CadastrNumber *string  `bson:"cadastrNumber,omitempty"`
	SeoText       *string  `bson:"seoText,omitempty"`
	YoutubeLink   *string  `bson:"youtubeLink,omitempty"`
	TourLink      *string  `bson:"tourLink,omitempty"`

	InCity       *bool   `bson:"inCity,omitempty"`
	CityDistance *int    `bson:"cityDistance,omitempty"`
	Region       *string `bson:"region,omitempty"`
	SubRegion    *string `bson:"subRegion,omitempty"`

	DeveloperID *primitive.ObjectID `bson:"developer,omitempty"`

	IsReady          *bool                  `bson:"isReady,omitempty"`
	ReadinessQuarter *estate_entity.Quarter `bson:"readinessQuarter,omitempty"`
	ReadinessYear    *int                   `bson:"readinessYear,omitempty"`

	ImageIDs              []primitive.ObjectID `bson:"images"`
	DocumentIDs           []primitive.ObjectID `bson:"documents"`
	ProjectDeclarationIDs []primitive.ObjectID `bson:"projectDeclaration"`

	PublicationStatus *shared_entity.PublicationStatus `bson:"publicationStatus,omitempty"`

	InternalInfo *string `bson:"internalInfo,omitempty"`

	IsDeleted *bool `bson:"isDeleted,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *VillageDAO) FromEntity(entity estate_entity.Village) *VillageDAO {
	// Prepare result
	*dao = VillageDAO{
		Title:         entity.Title,
		Description:   entity.Description,
		Address:       entity.Address,
		Lat:           entity.Lat,
		Lon:           entity.Lon,
		CadastrNumber: entity.CadastrNumber,
		SeoText:       entity.SeoText,
		YoutubeLink:   entity.YoutubeLink,
		TourLink:      entity.TourLink,

		InCity:       entity.InCity,
		CityDistance: entity.CityDistance,
		Region:       entity.Region,
		SubRegion:    entity.SubRegion,

		IsReady:          entity.IsReady,
		ReadinessQuarter: entity.ReadinessQuarter,
		ReadinessYear:    entity.ReadinessYear,

		PublicationStatus: entity.PublicationStatus,

		InternalInfo: entity.InternalInfo,

		IsDeleted: entity.IsDeleted,

		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.DeveloperID); err == nil {
		dao.DeveloperID = eid
	}

	if eid, err := utils.ObjectIDsFromStrings(entity.ImageIDs); err == nil {
		dao.ImageIDs = eid
	}

	if eid, err := utils.ObjectIDsFromStrings(entity.DocumentIDs); err == nil {
		dao.DocumentIDs = eid
	}

	if eid, err := utils.ObjectIDsFromStrings(entity.ProjectDeclarationIDs); err == nil {
		dao.ProjectDeclarationIDs = eid
	}

	// All done
	return dao
}

func (dao *VillageDAO) ToEntity() *estate_entity.Village {
	// Prepare result
	return &estate_entity.Village{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},

		Title:         dao.Title,
		Description:   dao.Description,
		Address:       dao.Address,
		Lat:           dao.Lat,
		Lon:           dao.Lon,
		CadastrNumber: dao.CadastrNumber,
		SeoText:       dao.SeoText,
		YoutubeLink:   dao.YoutubeLink,
		TourLink:      dao.TourLink,

		InCity:       dao.InCity,
		CityDistance: dao.CityDistance,
		Region:       dao.Region,
		SubRegion:    dao.SubRegion,

		DeveloperID: utils.StringFromObjectID(dao.DeveloperID),

		IsReady:          dao.IsReady,
		ReadinessQuarter: dao.ReadinessQuarter,
		ReadinessYear:    dao.ReadinessYear,

		ImageIDs:              utils.StringsFromObjectIDs(dao.ImageIDs),
		DocumentIDs:           utils.StringsFromObjectIDs(dao.DocumentIDs),
		ProjectDeclarationIDs: utils.StringsFromObjectIDs(dao.ProjectDeclarationIDs),

		PublicationStatus: dao.PublicationStatus,

		InternalInfo: dao.InternalInfo,

		IsDeleted: dao.IsDeleted,
	}
}

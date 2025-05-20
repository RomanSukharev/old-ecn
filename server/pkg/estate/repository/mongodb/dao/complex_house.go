package estate_mongodb_dao

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ComplexHouseDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	ComplexID *primitive.ObjectID `bson:"complex,omitempty"`

	Title         *string  `bson:"title,omitempty"`
	Description   *string  `bson:"description,omitempty"`
	Address       *string  `bson:"address,omitempty"`
	Lat           *float64 `bson:"lat,omitempty"`
	Lon           *float64 `bson:"lon,omitempty"`
	CadastrNumber *string  `bson:"cadastrNumber,omitempty"`
	SeoText       *string  `bson:"seoText,omitempty"`
	YoutubeLink   *string  `bson:"youtubeLink,omitempty"`
	TourLink      *string  `bson:"tourLink,omitempty"`

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

func (dao *ComplexHouseDAO) FromEntity(entity estate_entity.ComplexHouse) *ComplexHouseDAO {
	// Prepare result
	*dao = ComplexHouseDAO{
		Title:         entity.Title,
		Description:   entity.Description,
		Address:       entity.Address,
		Lat:           entity.Lat,
		Lon:           entity.Lon,
		CadastrNumber: entity.CadastrNumber,
		SeoText:       entity.SeoText,
		YoutubeLink:   entity.YoutubeLink,
		TourLink:      entity.TourLink,

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

	if eid, err := utils.ObjectIDFromString(entity.ComplexID); err == nil {
		dao.ComplexID = eid
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

func (dao *ComplexHouseDAO) ToEntity() *estate_entity.ComplexHouse {
	// Prepare result
	return &estate_entity.ComplexHouse{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},

		ComplexID: utils.StringFromObjectID(dao.ComplexID),

		Title:         dao.Title,
		Description:   dao.Description,
		Address:       dao.Address,
		Lat:           dao.Lat,
		Lon:           dao.Lon,
		CadastrNumber: dao.CadastrNumber,
		SeoText:       dao.SeoText,
		YoutubeLink:   dao.YoutubeLink,
		TourLink:      dao.TourLink,

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

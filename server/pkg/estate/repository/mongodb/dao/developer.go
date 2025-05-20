package estate_mongodb_dao

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DeveloperDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	Title  *string             `bson:"title,omitempty"`
	LogoID *primitive.ObjectID `bson:"logo,omitempty"`
	URL    *string             `bson:"url,omitempty"`

	IsDeleted *bool `bson:"isDeleted,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *DeveloperDAO) FromEntity(entity estate_entity.Developer) *DeveloperDAO {
	// Prepare result
	*dao = DeveloperDAO{
		Title:     entity.Title,
		URL:       entity.URL,
		IsDeleted: entity.IsDeleted,

		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.LogoID); err == nil {
		dao.LogoID = eid
	}

	// All done
	return dao
}

func (dao *DeveloperDAO) ToEntity() *estate_entity.Developer {
	// Prepare result
	return &estate_entity.Developer{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},

		Title:     dao.Title,
		LogoID:    utils.StringFromObjectID(dao.LogoID),
		URL:       dao.URL,
		IsDeleted: dao.IsDeleted,
	}
}

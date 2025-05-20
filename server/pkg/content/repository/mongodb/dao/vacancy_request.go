package content_mongodb_dao

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type VacancyRequestDAO struct {
	ID              primitive.ObjectID   `bson:"_id,omitempty"`
	VacancyID       *primitive.ObjectID  `bson:"vacancy,omitempty"`
	Name            string               `bson:"name,omitempty"`
	Phone           string               `bson:"phone,omitempty"`
	Letter          string               `bson:"letter,omitempty"`
	Attachments     []primitive.ObjectID `bson:"attachments,omitempty"`
	InternalComment string               `bson:"internalComment,omitempty"`
	Status          string               `bson:"status,omitempty"`
	CreatedAt       time.Time            `bson:"createdAt,omitempty"`
	UpdatedAt       time.Time            `bson:"updatedAt,omitempty"`
}

func (dao *VacancyRequestDAO) FromEntity(entity content_entity.VacancyRequest) *VacancyRequestDAO {
	*dao = VacancyRequestDAO{
		Name:            entity.Name,
		Phone:           entity.Phone,
		Letter:          entity.Letter,
		InternalComment: entity.InternalComment,
		Status:          string(entity.Status),
		CreatedAt:       entity.CreatedAt,
		UpdatedAt:       entity.UpdatedAt,
		//Attachments: ,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.VacancyID); err == nil {
		dao.VacancyID = eid
	}

	return dao
}

func (dao *VacancyRequestDAO) ToEntity() *content_entity.VacancyRequest {
	return &content_entity.VacancyRequest{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		VacancyID:       utils.StringFromObjectID(dao.VacancyID),
		Name:            dao.Name,
		Phone:           dao.Phone,
		Letter:          dao.Letter,
		InternalComment: dao.InternalComment,
		Status:          content_entity.VacancyRequestStatus(dao.Status),
		// Attachments: ,
	}
}

package content_mongodb_dao

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ReviewDAO struct {
	ID                primitive.ObjectID  `bson:"_id,omitempty"`
	EmployeeID        *primitive.ObjectID `bson:"employee,omitempty"`
	Text              string              `bson:"text,omitempty"`
	AuthorName        string              `bson:"authorName,omitempty"`
	AuthorPhone       string              `bson:"authorPhone,omitempty"`
	Status            string              `bson:"status,omitempty"`
	PublicationStatus string              `bson:"publicationStatus,omitempty"`
	CreatedAt         time.Time           `bson:"createdAt,omitempty"`
	UpdatedAt         time.Time           `bson:"updatedAt,omitempty"`
}

func (dao *ReviewDAO) FromEntity(entity content_entity.Review) *ReviewDAO {
	*dao = ReviewDAO{
		Text:              entity.Text,
		AuthorName:        entity.AuthorName,
		AuthorPhone:       entity.AuthorPhone,
		Status:            string(entity.Status),
		PublicationStatus: string(entity.PublicationStatus),
		CreatedAt:         entity.CreatedAt,
		UpdatedAt:         entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.EmployeeID); err == nil {
		dao.EmployeeID = eid
	}

	return dao
}

func (dao *ReviewDAO) ToEntity() *content_entity.Review {
	return &content_entity.Review{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		EmployeeID:        utils.StringFromObjectID(dao.EmployeeID),
		Text:              dao.Text,
		AuthorName:        dao.AuthorName,
		AuthorPhone:       dao.AuthorPhone,
		Status:            content_entity.ReviewStatus(dao.Status),
		PublicationStatus: shared_entity.PublicationStatus(dao.PublicationStatus),
	}
}

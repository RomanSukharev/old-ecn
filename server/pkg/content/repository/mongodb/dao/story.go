package content_mongodb_dao

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Новость
type StoryDAO struct {
	ID                primitive.ObjectID  `bson:"_id,omitempty"`
	Category          string              `bson:"category,omitempty"`
	Title             string              `bson:"title,omitempty"`
	Teaser            string              `bson:"teaser,omitempty"`
	CoverID           *primitive.ObjectID `bson:"cover,omitempty"`
	PublicationStatus string              `bson:"publicationStatus,omitempty"`
	ContentBlocks     []ContentBlockDAO   `bson:"contentBlocks,omitempty"`
	CreatedAt         time.Time           `bson:"createdAt,omitempty"`
	UpdatedAt         time.Time           `bson:"updatedAt,omitempty"`
}

func (dao *StoryDAO) FromEntity(entity content_entity.Story) *StoryDAO {
	*dao = StoryDAO{
		Category:          string(entity.Category),
		Title:             entity.Title,
		Teaser:            entity.Teaser,
		PublicationStatus: string(entity.PublicationStatus),
		CreatedAt:         entity.CreatedAt,
		UpdatedAt:         entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.CoverID); err == nil {
		dao.CoverID = eid
	}

	for _, v := range entity.ContentBlocks {
		dao.ContentBlocks = append(dao.ContentBlocks, *new(ContentBlockDAO).FromEntity(v))
	}

	return dao
}

func (dao *StoryDAO) ToEntity() *content_entity.Story {
	var contentBlocks []content_entity.ContentBlock
	for _, v := range dao.ContentBlocks {
		contentBlocks = append(contentBlocks, *v.ToEntity())
	}

	return &content_entity.Story{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		Category:          content_entity.StoryCategory(dao.Category),
		Title:             dao.Title,
		Teaser:            dao.Teaser,
		CoverID:           utils.StringFromObjectID(dao.CoverID),
		PublicationStatus: shared_entity.PublicationStatus(dao.PublicationStatus),
		ContentBlocks:     contentBlocks,
	}
}

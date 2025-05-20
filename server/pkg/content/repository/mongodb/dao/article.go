package content_mongodb_dao

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ArticleDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	GroupID           *primitive.ObjectID `bson:"group,omitempty"`
	Title             string              `bson:"title,omitempty"`
	CoverID           *primitive.ObjectID `bson:"cover,omitempty"`
	ContentBlocks     []ContentBlockDAO   `bson:"contentBlocks,omitempty"`
	PublicationStatus string              `bson:"publicationStatus,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *ArticleDAO) FromEntity(entity content_entity.Article) *ArticleDAO {
	*dao = ArticleDAO{
		Title:             entity.Title,
		PublicationStatus: string(entity.PublicationStatus),

		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.GroupID); err == nil {
		dao.GroupID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.CoverID); err == nil {
		dao.CoverID = eid
	}

	for _, v := range entity.ContentBlocks {
		dao.ContentBlocks = append(dao.ContentBlocks, *new(ContentBlockDAO).FromEntity(v))
	}

	return dao
}

func (dao *ArticleDAO) ToEntity() *content_entity.Article {
	var contentBlocks []content_entity.ContentBlock
	for _, v := range dao.ContentBlocks {
		contentBlocks = append(contentBlocks, *v.ToEntity())
	}

	return &content_entity.Article{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},

		GroupID:           utils.StringFromObjectID(dao.GroupID),
		CoverID:           utils.StringFromObjectID(dao.CoverID),
		Title:             dao.Title,
		PublicationStatus: shared_entity.PublicationStatus(dao.PublicationStatus),
		ContentBlocks:     contentBlocks,
	}
}

package content_mongodb_dao

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type PageDAO struct {
	ID                primitive.ObjectID `bson:"_id,omitempty"`
	Url               string             `bson:"url,omitempty"`
	Title             string             `bson:"title,omitempty"`
	Description       string             `bson:"description,omitempty"`
	ContentBlocks     []ContentBlockDAO  `bson:"contentBlocks,omitempty"`
	PublicationStatus string             `bson:"publicationStatus,omitempty"`
	CreatedAt         time.Time          `bson:"createdAt,omitempty"`
	UpdatedAt         time.Time          `bson:"updatedAt,omitempty"`
}

func (dao *PageDAO) FromEntity(entity content_entity.Page) *PageDAO {
	*dao = PageDAO{
		Url:               entity.Url,
		Title:             entity.Title,
		Description:       entity.Description,
		PublicationStatus: string(entity.PublicationStatus),
		CreatedAt:         entity.CreatedAt,
		UpdatedAt:         entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	for _, v := range entity.ContentBlocks {
		dao.ContentBlocks = append(dao.ContentBlocks, *new(ContentBlockDAO).FromEntity(v))
	}

	return dao
}

func (dao *PageDAO) ToEntity() *content_entity.Page {
	var contentBlocks []content_entity.ContentBlock
	for _, v := range dao.ContentBlocks {
		contentBlocks = append(contentBlocks, *v.ToEntity())
	}

	return &content_entity.Page{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		Url:               dao.Url,
		Title:             dao.Title,
		Description:       dao.Description,
		PublicationStatus: shared_entity.PublicationStatus(dao.PublicationStatus),
		ContentBlocks:     contentBlocks,
	}
}

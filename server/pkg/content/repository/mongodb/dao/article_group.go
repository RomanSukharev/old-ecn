package content_mongodb_dao

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ArticleGroupDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	Title string `bson:"title,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *ArticleGroupDAO) FromEntity(entity content_entity.ArticleGroup) *ArticleGroupDAO {
	*dao = ArticleGroupDAO{
		Title: entity.Title,

		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	return dao
}

func (dao *ArticleGroupDAO) ToEntity() *content_entity.ArticleGroup {
	return &content_entity.ArticleGroup{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},

		Title: dao.Title,
	}
}

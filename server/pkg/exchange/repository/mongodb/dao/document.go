package exchange_mongodb_dao

import (
	"time"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DocumentDAO struct {
	ID        primitive.ObjectID `bson:"_id,omitempty"`
	URL       string             `bson:"url,omitempty"`
	Path      string             `bson:"path,omitempty"`
	Title     string             `bson:"title,omitempty"`
	FileName  string             `bson:"fileName,omitempty"`
	FileType  string             `bson:"fileType,omitempty"`
	CreatedAt time.Time          `bson:"createdAt,omitempty"`
	UpdatedAt time.Time          `bson:"updatedAt,omitempty"`
}

func (dao *DocumentDAO) FromEntity(entity exchange_entity.Document) *DocumentDAO {
	*dao = DocumentDAO{
		URL:       entity.URL,
		Path:      entity.Path,
		Title:     entity.Title,
		FileName:  entity.FileName,
		FileType:  entity.FileType,
		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	return dao
}

func (dao *DocumentDAO) ToEntity() *exchange_entity.Document {
	return &exchange_entity.Document{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		URL:      dao.URL,
		Path:     dao.Path,
		Title:    dao.Title,
		FileName: dao.FileName,
		FileType: dao.FileType,
	}
}

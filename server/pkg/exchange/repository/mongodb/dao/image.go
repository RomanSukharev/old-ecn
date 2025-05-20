package exchange_mongodb_dao

import (
	"time"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ImageDAO struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	URL         string             `bson:"url,omitempty"`
	Path        string             `bson:"path,omitempty"`
	Title       string             `bson:"title,omitempty"`
	FileName    string             `bson:"fileName,omitempty"`
	FileType    string             `bson:"fileType,omitempty"`
	Preset      string             `bson:"preset,omitempty"`
	PreviewURL  string             `bson:"previewUrl,omitempty"`
	PreviewPath string             `bson:"previewPath,omitempty"`
	BlurHash    string             `bson:"blurHash,omitempty"`
	CreatedAt   time.Time          `bson:"createdAt,omitempty"`
	UpdatedAt   time.Time          `bson:"updatedAt,omitempty"`
}

func (dao *ImageDAO) FromEntity(entity exchange_entity.Image) *ImageDAO {
	*dao = ImageDAO{
		URL:         entity.URL,
		Path:        entity.Path,
		Title:       entity.Title,
		FileName:    entity.FileName,
		FileType:    entity.FileType,
		Preset:      string(entity.Preset),
		PreviewURL:  entity.PreviewURL,
		PreviewPath: entity.PreviewPath,
		BlurHash:    entity.BlurHash,
		CreatedAt:   entity.CreatedAt,
		UpdatedAt:   entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	return dao
}

func (dao *ImageDAO) ToEntity() *exchange_entity.Image {
	return &exchange_entity.Image{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		URL:         dao.URL,
		Path:        dao.Path,
		Title:       dao.Title,
		FileName:    dao.FileName,
		FileType:    dao.FileType,
		Preset:      exchange_entity.ImagePreset(dao.Preset),
		PreviewURL:  dao.PreviewURL,
		PreviewPath: dao.PreviewPath,
		BlurHash:    dao.BlurHash,
	}
}

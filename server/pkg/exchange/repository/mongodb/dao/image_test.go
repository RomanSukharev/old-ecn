package exchange_mongodb_dao

import (
	"testing"
	"time"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	testImageID           = "64128c014984c7696d66795e"
	testImagePrimitiveID  = primitive.NewObjectID()
	testImageURL          = "url.ru"
	testImagePath         = "/path"
	testImageTitle        = "Some title"
	testImageFilename     = "Some filename"
	testImageFiletype     = "Some filetype"
	testImagePreset       = exchange_entity.ImagePresetEstateComplexPhoto
	testImageStringPreset = "ESTATE_COMPLEX_PHOTO"
	testImagePreviewURL   = "previewurl.ru"
	testImagePreviewPath  = "/previewpath"
	testImageBlurHash     = "Some blurhash"
	testImageCreatedAt    = time.Now()
	testImageUpdatedAt    = time.Now()
)

func TestImageDAO_FromEntity(t *testing.T) {
	t.Run("EmptyImage", func(t *testing.T) {
		entity := exchange_entity.Image{}
		dao := ImageDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)
		assert.Equal(t, result.URL, "")
		assert.Equal(t, result.Path, "")
		assert.Equal(t, result.Title, "")
		assert.Equal(t, result.FileName, "")
		assert.Equal(t, result.FileType, "")
		assert.Equal(t, result.Preset, "")
		assert.Equal(t, result.PreviewURL, "")
		assert.Equal(t, result.PreviewPath, "")
		assert.Equal(t, result.BlurHash, "")
	})

	t.Run("FilledImage", func(t *testing.T) {
		entity := exchange_entity.Image{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testImageID,
				CreatedAt: testImageCreatedAt,
				UpdatedAt: testImageUpdatedAt,
			},
			URL:         testImageURL,
			Path:        testImagePath,
			Title:       testImageTitle,
			FileName:    testImageFilename,
			FileType:    testImageFiletype,
			PreviewURL:  testImagePreviewURL,
			PreviewPath: testImagePreviewPath,
			BlurHash:    testImageBlurHash,
			Preset:      testImagePreset,
		}
		dao := ImageDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.URL, "")
		assert.NotEqual(t, result.Path, "")
		assert.NotEqual(t, result.Title, "")
		assert.NotEqual(t, result.FileName, "")
		assert.NotEqual(t, result.FileType, "")
		assert.NotEqual(t, result.PreviewURL, "")
		assert.NotEqual(t, result.PreviewPath, "")
		assert.NotEqual(t, result.BlurHash, "")
		assert.NotEqual(t, result.Preset, "")

		assert.Equal(t, result.ID.Hex(), testImageID)
		assert.Equal(t, result.URL, testImageURL)
		assert.Equal(t, result.Path, testImagePath)
		assert.Equal(t, result.Title, testImageTitle)
		assert.Equal(t, result.FileName, testImageFilename)
		assert.Equal(t, result.FileType, testImageFiletype)
		assert.Equal(t, result.PreviewURL, testImagePreviewURL)
		assert.Equal(t, result.PreviewPath, testImagePreviewPath)
		assert.Equal(t, result.BlurHash, testImageBlurHash)
		assert.Equal(t, result.Preset, testImageStringPreset)
		assert.Equal(t, result.CreatedAt, testImageCreatedAt)
		assert.Equal(t, result.UpdatedAt, testImageUpdatedAt)
	})
}

func TestImageDAO_ToEntity(t *testing.T) {

	t.Run("EmptyImage", func(t *testing.T) {
		dao := &ImageDAO{
			ID: testImagePrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, testImagePrimitiveID.Hex())
		assert.Equal(t, result.URL, "")
		assert.Equal(t, result.Path, "")
		assert.Equal(t, result.Title, "")
		assert.Equal(t, result.FileName, "")
		assert.Equal(t, result.FileType, "")
		assert.Equal(t, string(result.Preset), "")
		assert.Equal(t, result.PreviewURL, "")
		assert.Equal(t, result.PreviewPath, "")
		assert.Equal(t, result.BlurHash, "")
	})

	t.Run("FilledImage", func(t *testing.T) {
		dao := &ImageDAO{
			ID:          testImagePrimitiveID,
			URL:         testImageURL,
			Path:        testImagePath,
			Title:       testImageTitle,
			FileName:    testImageFilename,
			FileType:    testImageFiletype,
			Preset:      testImageStringPreset,
			PreviewURL:  testImagePreviewURL,
			PreviewPath: testImagePreviewPath,
			BlurHash:    testImageBlurHash,
			CreatedAt:   testImageCreatedAt,
			UpdatedAt:   testImageUpdatedAt,
		}
		result := dao.ToEntity()

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.URL, "")
		assert.NotEqual(t, result.Path, "")
		assert.NotEqual(t, result.Title, "")
		assert.NotEqual(t, result.FileName, "")
		assert.NotEqual(t, result.FileType, "")
		assert.NotEqual(t, string(result.Preset), "")
		assert.NotEqual(t, result.PreviewURL, "")
		assert.NotEqual(t, result.PreviewPath, "")
		assert.NotEqual(t, result.BlurHash, "")

		assert.Equal(t, result.ID, *utils.StringFromObjectID(&testImagePrimitiveID))
		assert.Equal(t, result.URL, testImageURL)
		assert.Equal(t, result.Path, testImagePath)
		assert.Equal(t, result.Title, testImageTitle)
		assert.Equal(t, result.FileName, testImageFilename)
		assert.Equal(t, result.FileType, testImageFiletype)
		assert.Equal(t, result.Preset, testImagePreset)
		assert.Equal(t, result.PreviewURL, testImagePreviewURL)
		assert.Equal(t, result.PreviewPath, testImagePreviewPath)
		assert.Equal(t, result.BlurHash, testImageBlurHash)
		assert.Equal(t, result.CreatedAt, testImageCreatedAt)
		assert.Equal(t, result.UpdatedAt, testImageUpdatedAt)
	})

}

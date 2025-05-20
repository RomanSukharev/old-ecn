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
	testDocumentID          = "64128c014984c7696d66795e"
	testDocumentPrimitiveID = primitive.NewObjectID()
	testDocumentURL         = "url.ru"
	testDocumentPath        = "/path"
	testDocumentTitle       = "Some title"
	testDocumentFilename    = "Some filename"
	testDocumentFiletype    = "Some filetype"
	testDocumentCreatedAt   = time.Now()
	testDocumentUpdatedAt   = time.Now()
)

func TestDocumentDAO_FromEntity(t *testing.T) {
	t.Run("EmptyDocument", func(t *testing.T) {
		entity := exchange_entity.Document{}
		dao := DocumentDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)
		assert.Equal(t, result.URL, "")
		assert.Equal(t, result.Path, "")
		assert.Equal(t, result.Title, "")
		assert.Equal(t, result.FileName, "")
		assert.Equal(t, result.FileType, "")
	})

	t.Run("FilledDocument", func(t *testing.T) {
		entity := exchange_entity.Document{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testDocumentID,
				CreatedAt: testDocumentCreatedAt,
				UpdatedAt: testDocumentUpdatedAt,
			},
			URL:      testDocumentURL,
			Path:     testDocumentPath,
			Title:    testDocumentTitle,
			FileName: testDocumentFilename,
			FileType: testDocumentFiletype,
		}
		dao := &DocumentDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.URL, "")
		assert.NotEqual(t, result.Path, "")
		assert.NotEqual(t, result.Title, "")
		assert.NotEqual(t, result.FileName, "")
		assert.NotEqual(t, result.FileType, "")

		assert.Equal(t, result.ID.Hex(), testDocumentID)
		assert.Equal(t, result.URL, testDocumentURL)
		assert.Equal(t, result.Path, testDocumentPath)
		assert.Equal(t, result.Title, testDocumentTitle)
		assert.Equal(t, result.FileName, testDocumentFilename)
		assert.Equal(t, result.FileType, testDocumentFiletype)
		assert.Equal(t, result.CreatedAt, testDocumentCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDocumentUpdatedAt)
	})
}

func TestDocumentDAO_ToEntity(t *testing.T) {

	t.Run("EmptyDocument", func(t *testing.T) {
		dao := &DocumentDAO{
			ID: testDocumentPrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, testDocumentPrimitiveID.Hex())
		assert.Equal(t, result.URL, "")
		assert.Equal(t, result.Path, "")
		assert.Equal(t, result.Title, "")
		assert.Equal(t, result.FileName, "")
		assert.Equal(t, result.FileType, "")
	})

	t.Run("FilledDocument", func(t *testing.T) {
		dao := &DocumentDAO{
			ID:        testDocumentPrimitiveID,
			URL:       testDocumentURL,
			Path:      testDocumentPath,
			Title:     testDocumentTitle,
			FileName:  testDocumentFilename,
			FileType:  testDocumentFiletype,
			CreatedAt: testDocumentCreatedAt,
			UpdatedAt: testDocumentUpdatedAt,
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

		assert.Equal(t, result.ID, *utils.StringFromObjectID(&testDocumentPrimitiveID))
		assert.Equal(t, result.URL, testDocumentURL)
		assert.Equal(t, result.Path, testDocumentPath)
		assert.Equal(t, result.Title, testDocumentTitle)
		assert.Equal(t, result.FileName, testDocumentFilename)
		assert.Equal(t, result.FileType, testDocumentFiletype)
		assert.Equal(t, result.CreatedAt, testDocumentCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDocumentUpdatedAt)
	})
}

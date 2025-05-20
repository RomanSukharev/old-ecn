package staff_mongodb_dao

import (
	"testing"
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	testPositionID          = "64128c014984c7696d66795e"
	testPositionPrimitiveID = primitive.NewObjectID()
	testPositionTitle       = "Some title"
	testPositionCreatedAt   = time.Now()
	testPositionUpdatedAt   = time.Now()
)

func TestPositionDAO_FromEntity(t *testing.T) {

	t.Run("EmptyPosition", func(t *testing.T) {
		entity := staff_entity.Position{}
		dao := PositionDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)
		assert.Equal(t, result.Title, "")
	})

	t.Run("FilledPosition", func(t *testing.T) {
		entity := staff_entity.Position{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testPositionID,
				CreatedAt: testPositionCreatedAt,
				UpdatedAt: testPositionUpdatedAt,
			},
			Title: testPositionTitle,
		}

		dao := PositionDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.Equal(t, result.ID.Hex(), testPositionID)
		assert.Equal(t, result.Title, testPositionTitle)
		assert.Equal(t, result.CreatedAt, testPositionCreatedAt)
		assert.Equal(t, result.UpdatedAt, testPositionUpdatedAt)
	})
}

func TestPositionDAO_ToEntity(t *testing.T) {

	t.Run("EmptyPosition", func(t *testing.T) {
		dao := &PositionDAO{
			ID: testPositionPrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, *utils.StringFromObjectID(&testPositionPrimitiveID))
		assert.Equal(t, result.Title, "")
	})

	t.Run("FilledPosition", func(t *testing.T) {
		dao := &PositionDAO{
			ID:        testPositionPrimitiveID,
			Title:     testPositionTitle,
			CreatedAt: testPositionCreatedAt,
			UpdatedAt: testPositionUpdatedAt,
		}

		result := dao.ToEntity()

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.Equal(t, result.ID, *utils.StringFromObjectID(&testPositionPrimitiveID))
		assert.Equal(t, result.Title, testPositionTitle)
		assert.Equal(t, result.CreatedAt, testPositionCreatedAt)
		assert.Equal(t, result.UpdatedAt, testPositionUpdatedAt)
	})
}

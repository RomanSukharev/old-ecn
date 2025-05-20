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
	testDepartmentID               = "64128c014984c7696d66795e"
	testDepartmentPrimitiveID      = primitive.NewObjectID()
	testDepartmentChiefID          = "64128c014984c7696d66795e"
	testDepartmentPrimitiveChiefID = primitive.NewObjectID()
	testDepartmentTitle            = "Some title"
	testDepartmentCreatedAt        = time.Now()
	testDepartmentUpdatedAt        = time.Now()
)

func TestDepartmentDAO_FromEntity(t *testing.T) {
	t.Run("EmptyDepartment", func(t *testing.T) {
		entity := staff_entity.Department{}
		dao := DepartmentDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)
		assert.Equal(t, result.Title, "")

		assert.Nil(t, result.ChiefID)
	})

	t.Run("FilledDepartment", func(t *testing.T) {
		entity := staff_entity.Department{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testDepartmentID,
				CreatedAt: testDepartmentCreatedAt,
				UpdatedAt: testDepartmentUpdatedAt,
			},
			Title:   testDepartmentTitle,
			ChiefID: &testDepartmentChiefID,
		}

		dao := DepartmentDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.NotNil(t, result.ChiefID)

		assert.Equal(t, result.ID.Hex(), testDepartmentID)
		assert.Equal(t, *utils.StringFromObjectID(result.ChiefID), testDepartmentChiefID)
		assert.Equal(t, result.Title, testDepartmentTitle)
		assert.Equal(t, result.CreatedAt, testDepartmentCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDepartmentUpdatedAt)
	})
}

func TestDepartmentDAO_ToEntity(t *testing.T) {

	t.Run("EmptyDepartment", func(t *testing.T) {
		dao := &DepartmentDAO{
			ID: testDepartmentPrimitiveID,
		}

		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, testDepartmentPrimitiveID.Hex())
		assert.Equal(t, result.Title, "")

		assert.Nil(t, result.ChiefID)
	})

	t.Run("FilledDepartment", func(t *testing.T) {
		dao := &DepartmentDAO{
			ID:        testDepartmentPrimitiveID,
			ChiefID:   &testDepartmentPrimitiveChiefID,
			Title:     testDepartmentTitle,
			CreatedAt: testDepartmentCreatedAt,
			UpdatedAt: testDepartmentUpdatedAt,
		}

		result := dao.ToEntity()

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.NotNil(t, result.ChiefID)

		assert.Equal(t, result.ID, *utils.StringFromObjectID(&testDepartmentPrimitiveID))
		assert.Equal(t, result.Title, testDepartmentTitle)
		assert.Equal(t, *result.ChiefID, *utils.StringFromObjectID(&testDepartmentPrimitiveChiefID))
		assert.Equal(t, result.CreatedAt, testDepartmentCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDepartmentUpdatedAt)
	})
}

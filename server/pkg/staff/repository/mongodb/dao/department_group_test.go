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
	testDepartmentGroupID                    = "64128c014984c7696d66795e"
	testDepartmentGroupPrimitiveID           = primitive.NewObjectID()
	testDepartmentGroupDepartmentID          = "64128c014984c7696d66795e"
	testDepartmentGroupPrimitiveDepartmentID = primitive.NewObjectID()
	testDepartmentGroupChiefID               = "64128c014984c7696d66795e"
	testDepartmentGroupPrimitiveChiefID      = primitive.NewObjectID()
	testDepartmentGroupTitle                 = "Some title"
	testDepartmentGroupCreatedAt             = time.Now()
	testDepartmentGroupUpdatedAt             = time.Now()
)

func TestDepartmentGroupDAO_FromEntity(t *testing.T) {

	t.Run("EmptyDepartmentGroup", func(t *testing.T) {
		entity := staff_entity.DepartmentGroup{}
		dao := DepartmentGroupDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)
		assert.Equal(t, result.Title, "")

		assert.Nil(t, result.DepartmentID)
		assert.Nil(t, result.ChiefID)
	})

	t.Run("FilledDepartmentGroup", func(t *testing.T) {
		entity := staff_entity.DepartmentGroup{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testDepartmentGroupID,
				CreatedAt: testDepartmentGroupCreatedAt,
				UpdatedAt: testDepartmentGroupUpdatedAt,
			},
			DepartmentID: &testDepartmentGroupDepartmentID,
			ChiefID:      &testDepartmentGroupChiefID,
			Title:        testDepartmentGroupTitle,
		}
		dao := DepartmentGroupDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.NotNil(t, result.DepartmentID)
		assert.NotNil(t, result.ChiefID)

		assert.Equal(t, result.ID.Hex(), testDepartmentGroupID)
		assert.Equal(t, *utils.StringFromObjectID(result.DepartmentID), testDepartmentGroupDepartmentID)
		assert.Equal(t, *utils.StringFromObjectID(result.ChiefID), testDepartmentGroupChiefID)
		assert.Equal(t, result.Title, testDepartmentGroupTitle)
		assert.Equal(t, result.CreatedAt, testDepartmentGroupCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDepartmentGroupUpdatedAt)

	})

}

func TestDepartmentGroupDAO_ToEntity(t *testing.T) {

	t.Run("EmptyDepartmentGroup", func(t *testing.T) {
		dao := &DepartmentGroupDAO{
			ID: testDepartmentGroupPrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, testDepartmentGroupPrimitiveID.Hex())
		assert.Equal(t, result.Title, "")

		assert.Nil(t, result.DepartmentID)
		assert.Nil(t, result.ChiefID)
	})

	t.Run("FilledDepartmentGroup", func(t *testing.T) {
		dao := &DepartmentGroupDAO{
			ID:           testDepartmentGroupPrimitiveID,
			DepartmentID: &testDepartmentGroupPrimitiveDepartmentID,
			ChiefID:      &testDepartmentGroupPrimitiveChiefID,
			Title:        testDepartmentGroupTitle,
			CreatedAt:    testDepartmentGroupCreatedAt,
			UpdatedAt:    testDepartmentGroupUpdatedAt,
		}
		result := dao.ToEntity()

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.Equal(t, result.ID, testDepartmentGroupPrimitiveID.Hex())
		assert.Equal(t, *result.DepartmentID, *utils.StringFromObjectID(&testDepartmentGroupPrimitiveDepartmentID))
		assert.Equal(t, *result.ChiefID, *utils.StringFromObjectID(&testDepartmentGroupPrimitiveChiefID))
		assert.Equal(t, result.Title, testDepartmentGroupTitle)
		assert.Equal(t, result.CreatedAt, testDepartmentGroupCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDepartmentGroupUpdatedAt)
	})

}

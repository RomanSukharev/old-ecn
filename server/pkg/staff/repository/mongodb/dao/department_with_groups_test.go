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
	testDepartmentWithGroupsDepartmentID                                             = "64128c014984c7696d66795e"
	testDepartmentWithGroupsDepartmentPrimitiveID                                    = primitive.NewObjectID()
	testDepartmentWithGroupsDepartmentChiefID                                        = "64128c014984c7696d66795e"
	testDepartmentWithGroupsPrimitiveDepartmentChiefID                               = primitive.NewObjectID()
	testDepartmentWithGroupsDepartmentTitle                                          = "Some title"
	testDepartmentWithGroupsDepartmentGroups           staff_entity.DepartmentGroups = []staff_entity.DepartmentGroup{
		{
			BaseDocument: shared_entity.BaseDocument{ID: "64128c014984c7696d66795e"},
		}, {
			BaseDocument: shared_entity.BaseDocument{ID: "64128c014984c7696d66795e"},
		}}
	testDepartmentWithGroupsDeprtamentGroupDAO []DepartmentGroupDAO = []DepartmentGroupDAO{
		{ID: primitive.NewObjectID()},
		{ID: primitive.NewObjectID()},
	}
	testDepartmentWithGroupsDepartmentCreatedAt = time.Now()
	testDepartmentWithGroupsDepartmentUpdatedAt = time.Now()
)

func TestDepartmentWithGroupsDAO_FromEntity(t *testing.T) {

	t.Run("EmptyDepartmentWithGroups", func(t *testing.T) {
		entity := staff_entity.Department{}
		dao := DepartmentWithGroupsDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)
		assert.Equal(t, result.Title, "")

		assert.Empty(t, result.Groups)

		assert.Nil(t, result.ChiefID)
	})

	t.Run("FilledDepartmentWithGroups", func(t *testing.T) {
		entity := staff_entity.Department{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testDepartmentWithGroupsDepartmentID,
				CreatedAt: testDepartmentWithGroupsDepartmentCreatedAt,
				UpdatedAt: testDepartmentWithGroupsDepartmentUpdatedAt,
			},
			ChiefID: &testDepartmentWithGroupsDepartmentChiefID,
			Title:   testDepartmentWithGroupsDepartmentTitle,
			Groups:  testDepartmentWithGroupsDepartmentGroups,
		}
		dao := DepartmentWithGroupsDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.NotEmpty(t, result.Groups)
		assert.NotNil(t, result.ChiefID)

		assert.Equal(t, result.ID.Hex(), testDepartmentWithGroupsDepartmentID)
		assert.Equal(t, *utils.StringFromObjectID(result.ChiefID), testDepartmentWithGroupsDepartmentChiefID)
		assert.Equal(t, result.Title, testDepartmentWithGroupsDepartmentTitle)
		assert.Equal(t, len(result.Groups), len(testDepartmentWithGroupsDepartmentGroups))
		assert.Equal(t, result.CreatedAt, testDepartmentWithGroupsDepartmentCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDepartmentWithGroupsDepartmentUpdatedAt)
	})
}

func TestDepartmentWithGroupsDAO_ToEntity(t *testing.T) {

	t.Run("EmptyDeparmtmentWithGroups", func(t *testing.T) {
		dao := &DepartmentWithGroupsDAO{
			ID: testDepartmentWithGroupsDepartmentPrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, testDepartmentWithGroupsDepartmentPrimitiveID.Hex())
		assert.Equal(t, result.Title, "")

		assert.Empty(t, result.Groups)

		assert.Nil(t, result.ChiefID)
	})

	t.Run("FilledDepartmentWithGroups", func(t *testing.T) {
		dao := &DepartmentWithGroupsDAO{
			ID:        testDepartmentWithGroupsDepartmentPrimitiveID,
			ChiefID:   &testDepartmentWithGroupsPrimitiveDepartmentChiefID,
			Title:     testDepartmentWithGroupsDepartmentTitle,
			Groups:    testDepartmentWithGroupsDeprtamentGroupDAO,
			CreatedAt: testDepartmentWithGroupsDepartmentCreatedAt,
			UpdatedAt: testDepartmentWithGroupsDepartmentUpdatedAt,
		}
		result := dao.ToEntity()

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.NotEmpty(t, result.Groups)
		assert.NotNil(t, result.ChiefID)

		assert.Equal(t, result.ID, testDepartmentWithGroupsDepartmentPrimitiveID.Hex())
		assert.Equal(t, *result.ChiefID, *utils.StringFromObjectID(&testDepartmentWithGroupsPrimitiveDepartmentChiefID))
		assert.Equal(t, result.Title, testDepartmentWithGroupsDepartmentTitle)
		assert.Equal(t, len(result.Groups), len(testDepartmentWithGroupsDeprtamentGroupDAO))
		assert.Equal(t, result.CreatedAt, testDepartmentWithGroupsDepartmentCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDepartmentWithGroupsDepartmentUpdatedAt)
	})
}

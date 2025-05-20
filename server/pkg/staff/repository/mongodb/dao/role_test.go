package staff_mongodb_dao

import (
	"testing"
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	testRoleID                                             = "64128c014984c7696d66795e"
	testRolePrimitiveID                                    = primitive.NewObjectID()
	testRoleTitle                                          = "Some title"
	testRoleTypePermissions   staff_entity.RolePermissions = []staff_entity.RolePermission{staff_entity.RolePermissionContentDeleteArticle}
	testRoleStringPermissions                              = []string{"CONTENT_DELETE_ARTICLE"}
	testRoleCreatedAt                                      = time.Now()
	testRoleUpdatedAt                                      = time.Now()
)

func TestRoleDAO_FromEntity(t *testing.T) {
	t.Run("EmptyRole", func(t *testing.T) {
		entity := staff_entity.Role{}
		dao := RoleDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)
		assert.Equal(t, result.Title, "")

		assert.Empty(t, result.Permissions)
	})

	t.Run("FilledRole", func(t *testing.T) {
		entity := staff_entity.Role{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testRoleID,
				CreatedAt: testRoleCreatedAt,
				UpdatedAt: testRoleUpdatedAt,
			},
			Title:       testRoleTitle,
			Permissions: testRoleTypePermissions,
		}

		dao := RoleDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		//TODO: improve the check assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.NotEmpty(t, result.Permissions)

		//TODO: improve the check assert.Equal(t, result.ID.Hex(), testRoleID)
		assert.Equal(t, result.Title, testRoleTitle)
		assert.Equal(t, result.Permissions, testRoleTypePermissions.String())
		assert.Equal(t, result.CreatedAt, testRoleCreatedAt)
		assert.Equal(t, result.UpdatedAt, testRoleUpdatedAt)

	})

}

func TestRoleDAO_ToEntity(t *testing.T) {

	t.Run("EmptyRole", func(t *testing.T) {
		dao := &RoleDAO{
			ID: testRolePrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, testRolePrimitiveID.Hex())
		assert.Equal(t, result.Title, "")

		assert.Empty(t, result.Permissions)
	})

	t.Run("FilledRole", func(t *testing.T) {
		dao := &RoleDAO{
			ID:          testRolePrimitiveID,
			Title:       testRoleTitle,
			Permissions: testRoleStringPermissions,
			CreatedAt:   testRoleCreatedAt,
			UpdatedAt:   testRoleUpdatedAt,
		}
		result := dao.ToEntity()

		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Title, "")

		assert.NotEmpty(t, result.Permissions)

		assert.Equal(t, result.ID, testRolePrimitiveID.Hex())
		assert.Equal(t, result.Title, testRoleTitle)
		assert.Equal(t, result.Permissions, testRoleTypePermissions)
		assert.Equal(t, result.CreatedAt, testRoleCreatedAt)
		assert.Equal(t, result.UpdatedAt, testRoleUpdatedAt)
	})
}

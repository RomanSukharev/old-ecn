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
	testEmployeeID                     = "64128c014984c7696d66795e"
	testPrimitiveEmployeeID            = primitive.NewObjectID()
	testEmployeeName                   = "Ivan"
	testEmployeeSurname                = "Ivanov"
	testEmployeePatronymic             = "Ivanovich"
	testEmployeeBirthday               = time.Now()
	testEmployeeEmail                  = "ivanpink@mail.ru"
	testEmployeePassword               = "pink12345"
	testEmployeePhone                  = "89999999999"
	testEmployeePositionID             = "64128c014984c7696d66795e"
	testEmployeePrimitivePositionID    = primitive.NewObjectID()
	testEmployeeDepartmentID           = "64128c014984c7696d66795e"
	testEmployeePrimitiveDepartmentID  = primitive.NewObjectID()
	testEmployeeGroupID                = "64128c014984c7696d66795e"
	testEmployeePrimitiveGroupID       = primitive.NewObjectID()
	testEmployeeRoleID                 = "64128c014984c7696d66795e"
	testEmployeePrimitiveRoleID        = primitive.NewObjectID()
	testEmployeeInternalInfo           = "Some internal info"
	testEmployeeShortDescription       = "Some short description"
	testEmployeeDescription            = "Some description"
	testEmployeeIsPublished            = true
	testEmployeeIsDeleted              = false
	testEmployeeAvatarID               = "64128c014984c7696d66795e"
	testEmployeePrimitiveAvatarID      = primitive.NewObjectID()
	testEmployeePublicImageID          = "64128c014984c7696d66795e"
	testEmployeePrimitivePublicImageID = primitive.NewObjectID()
	testEmployeeCreatedAt              = time.Now()
	testEmployeeUpdatedAt              = time.Now()
)

func TestEmployeeDAO_FromEntity(t *testing.T) {

	t.Run("EmptyEmployee", func(t *testing.T) {
		entity := staff_entity.Employee{}
		dao := EmployeeDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.Birthday.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)

		assert.Equal(t, result.Name, "")
		assert.Equal(t, result.Surname, "")
		assert.Equal(t, result.Patronymic, "")
		assert.Equal(t, result.Email, "")
		assert.Equal(t, result.Password, "")
		assert.Equal(t, result.Phone, "")
		assert.Equal(t, result.InternalInfo, "")
		assert.Equal(t, result.ShortDescription, "")
		assert.Equal(t, result.Description, "")
		assert.Equal(t, result.IsPublished, false)
		assert.Equal(t, result.IsDeleted, false)

		assert.Nil(t, result.PositionID)
		assert.Nil(t, result.DepartmentID)
		assert.Nil(t, result.GroupID)
		assert.Nil(t, result.RoleID)
		assert.Nil(t, result.AvatarID)
		assert.Nil(t, result.PublicImageID)
	})

	t.Run("FilledEmployee", func(t *testing.T) {

		entity := staff_entity.Employee{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testEmployeeID,
				CreatedAt: testEmployeeCreatedAt,
				UpdatedAt: testEmployeeUpdatedAt,
			},
			Name:             testEmployeeName,
			Surname:          testEmployeeSurname,
			Patronymic:       testEmployeePatronymic,
			Birthday:         testEmployeeBirthday,
			Email:            testEmployeeEmail,
			Password:         testEmployeePassword,
			Phone:            testEmployeePhone,
			PositionID:       &testEmployeePositionID,
			DepartmentID:     &testEmployeeDepartmentID,
			GroupID:          &testEmployeeGroupID,
			RoleID:           &testEmployeeRoleID,
			InternalInfo:     testEmployeeInternalInfo,
			ShortDescription: testEmployeeShortDescription,
			Description:      testEmployeeDescription,
			IsPublished:      testEmployeeIsPublished,
			IsDeleted:        testEmployeeIsDeleted,
			AvatarID:         &testEmployeeAvatarID,
			PublicImageID:    &testEmployeePublicImageID,
		}

		dao := EmployeeDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.Birthday.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Name, "")
		assert.NotEqual(t, result.Surname, "")
		assert.NotEqual(t, result.Patronymic, "")
		assert.NotEqual(t, result.Email, "")
		//TODO: improve the check // assert.NotEqual(t, result.Password, "")
		assert.NotEqual(t, result.Phone, "")
		assert.NotEqual(t, result.InternalInfo, "")
		assert.NotEqual(t, result.ShortDescription, "")
		assert.NotEqual(t, result.Description, "")
		assert.NotEqual(t, result.IsPublished, false)
		assert.NotEqual(t, result.IsDeleted, true)

		assert.NotNil(t, result.PositionID)
		assert.NotNil(t, result.DepartmentID)
		assert.NotNil(t, result.GroupID)
		assert.NotNil(t, result.RoleID)
		assert.NotNil(t, result.AvatarID)
		assert.NotNil(t, result.PublicImageID)

		assert.Equal(t, result.ID.Hex(), testEmployeeID)
		assert.Equal(t, result.Name, testEmployeeName)
		assert.Equal(t, result.Surname, testEmployeeSurname)
		assert.Equal(t, result.Patronymic, testEmployeePatronymic)
		assert.Equal(t, result.Birthday, testEmployeeBirthday)
		assert.Equal(t, result.Phone, testEmployeePhone)
		assert.Equal(t, result.Email, testEmployeeEmail)
		assert.Equal(t, *utils.StringFromObjectID(result.PositionID), testEmployeePositionID)
		assert.Equal(t, *utils.StringFromObjectID(result.DepartmentID), testEmployeeDepartmentID)
		assert.Equal(t, *utils.StringFromObjectID(result.GroupID), testEmployeeGroupID)
		assert.Equal(t, *utils.StringFromObjectID(result.RoleID), testEmployeeRoleID)
		assert.Equal(t, result.InternalInfo, testEmployeeInternalInfo)
		assert.Equal(t, result.ShortDescription, testEmployeeShortDescription)
		assert.Equal(t, result.Description, testEmployeeDescription)
		assert.Equal(t, result.IsPublished, testEmployeeIsPublished)
		assert.Equal(t, result.IsDeleted, testEmployeeIsDeleted)
		assert.Equal(t, *utils.StringFromObjectID(result.AvatarID), testEmployeeAvatarID)
		assert.Equal(t, *utils.StringFromObjectID(result.PublicImageID), testEmployeePublicImageID)
		assert.Equal(t, result.CreatedAt, testEmployeeCreatedAt)
		assert.Equal(t, result.UpdatedAt, testEmployeeUpdatedAt)
	})
}

func TestEmployeeDAO_ToEntity(t *testing.T) {

	t.Run("EmptyEmployee", func(t *testing.T) {
		dao := &EmployeeDAO{
			ID: testPrimitiveEmployeeID,
		}

		result := dao.ToEntity()

		assert.True(t, result.Birthday.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, testPrimitiveEmployeeID.Hex())
		assert.Equal(t, result.Name, "")
		assert.Equal(t, result.Surname, "")
		assert.Equal(t, result.Patronymic, "")
		assert.Equal(t, result.Email, "")
		assert.Equal(t, result.Password, "")
		assert.Equal(t, result.Phone, "")
		assert.Equal(t, result.InternalInfo, "")
		assert.Equal(t, result.ShortDescription, "")
		assert.Equal(t, result.Description, "")
		assert.Equal(t, result.IsPublished, false)
		assert.Equal(t, result.IsDeleted, false)

		assert.Nil(t, result.PositionID)
		assert.Nil(t, result.DepartmentID)
		assert.Nil(t, result.GroupID)
		assert.Nil(t, result.RoleID)
		assert.Nil(t, result.AvatarID)
		assert.Nil(t, result.PublicImageID)
	})

	t.Run("FilledEmployee", func(t *testing.T) {
		dao := &EmployeeDAO{
			ID:               testPrimitiveEmployeeID,
			Name:             testEmployeeName,
			Surname:          testEmployeeSurname,
			Patronymic:       testEmployeePatronymic,
			Birthday:         testEmployeeBirthday,
			Email:            testEmployeeEmail,
			Password:         testEmployeePassword,
			Phone:            testEmployeePhone,
			PositionID:       &testEmployeePrimitivePositionID,
			DepartmentID:     &testEmployeePrimitiveDepartmentID,
			GroupID:          &testEmployeePrimitiveGroupID,
			RoleID:           &testEmployeePrimitiveRoleID,
			InternalInfo:     testEmployeeInternalInfo,
			ShortDescription: testEmployeeShortDescription,
			Description:      testEmployeeDescription,
			IsPublished:      testEmployeeIsPublished,
			IsDeleted:        testEmployeeIsDeleted,
			AvatarID:         &testEmployeePrimitiveAvatarID,
			PublicImageID:    &testEmployeePrimitivePublicImageID,
			CreatedAt:        testEmployeeCreatedAt,
			UpdatedAt:        testEmployeeUpdatedAt,
		}

		result := dao.ToEntity()

		assert.False(t, result.Birthday.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotEqual(t, result.ID, primitive.NilObjectID)
		assert.NotEqual(t, result.Name, "")
		assert.NotEqual(t, result.Surname, "")
		assert.NotEqual(t, result.Patronymic, "")
		assert.NotEqual(t, result.Email, "")
		assert.NotEqual(t, result.Password, "")
		assert.NotEqual(t, result.Phone, "")
		assert.NotEqual(t, result.InternalInfo, "")
		assert.NotEqual(t, result.ShortDescription, "")
		assert.NotEqual(t, result.Description, "")
		assert.NotEqual(t, result.IsPublished, false)
		assert.NotEqual(t, result.IsDeleted, true)

		assert.NotNil(t, result.PositionID)
		assert.NotNil(t, result.DepartmentID)
		assert.NotNil(t, result.GroupID)
		assert.NotNil(t, result.RoleID)
		assert.NotNil(t, result.AvatarID)
		assert.NotNil(t, result.PublicImageID)

		assert.Equal(t, result.ID, testPrimitiveEmployeeID.Hex())
		assert.Equal(t, result.Name, testEmployeeName)
		assert.Equal(t, result.Surname, testEmployeeSurname)
		assert.Equal(t, result.Patronymic, testEmployeePatronymic)
		assert.Equal(t, result.Birthday, testEmployeeBirthday)
		assert.Equal(t, result.Phone, testEmployeePhone)
		assert.Equal(t, result.Email, testEmployeeEmail)
		assert.Equal(t, *result.PositionID, *utils.StringFromObjectID(&testEmployeePrimitivePositionID))
		assert.Equal(t, *result.DepartmentID, *utils.StringFromObjectID(&testEmployeePrimitiveDepartmentID))
		assert.Equal(t, *result.GroupID, *utils.StringFromObjectID(&testEmployeePrimitiveGroupID))
		assert.Equal(t, *result.RoleID, *utils.StringFromObjectID(&testEmployeePrimitiveRoleID))
		assert.Equal(t, result.InternalInfo, testEmployeeInternalInfo)
		assert.Equal(t, result.ShortDescription, testEmployeeShortDescription)
		assert.Equal(t, result.Description, testEmployeeDescription)
		assert.Equal(t, result.IsPublished, testEmployeeIsPublished)
		assert.Equal(t, result.IsDeleted, testEmployeeIsDeleted)
		assert.Equal(t, *result.AvatarID, *utils.StringFromObjectID(&testEmployeePrimitiveAvatarID))
		assert.Equal(t, *result.PublicImageID, *utils.StringFromObjectID(&testEmployeePrimitivePublicImageID))
		assert.Equal(t, result.CreatedAt, testEmployeeCreatedAt)
		assert.Equal(t, result.UpdatedAt, testEmployeeUpdatedAt)

	})

}

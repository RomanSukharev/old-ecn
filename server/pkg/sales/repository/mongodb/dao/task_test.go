package sales_mongodb_dao

import (
	"testing"
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	testTaskID                  = "64128c014984c7696d66795e"
	testTaskPrimitiveID         = primitive.NewObjectID()
	testTaskCreatedAt           = time.Now()
	testTaskUpdatedAt           = time.Now()
	testTaskInternalNumber      = 1
	testTaskTitle               = "Some title"
	testTaskIsHot               = false
	testTaskAssigneeID          = "64128c014984c7696d66795e"
	testTaskPrimitiveAssigneeID = primitive.NewObjectID()
	testTaskReporterID          = "64128c014984c7696d66795e"
	testTaskPrimitiveReporterID = primitive.NewObjectID()
	testTaskPropertyID          = "64128c014984c7696d66795e"
	testTaskPrimitivePropertyID = primitive.NewObjectID()
	testTaskContactID           = "64128c014984c7696d66795e"
	testTaskPrimitiveContactID  = primitive.NewObjectID()
	testTaskContactPhone        = "89999999999"
	testTaskLeadID              = "64128c014984c7696d66795e"
	testTaskPrimitiveLeadID     = primitive.NewObjectID()
	testTaskDealID              = "64128c014984c7696d66795e"
	testTaskPrimitiveDealID     = primitive.NewObjectID()
	testTaskStartDate           = time.Now()
	testTaskDurationDays        = 1
	testTaskDurationHours       = 24
	testTaskDetails             = "Some details"
	testTaskIsCompleted         = false
	testTaskEndDate             = time.Now()
	testTaskTag                 = "Some tag"
	testTaskIsDeleted           = false
)

func TestTaskDAO_FromEntity(t *testing.T) {

	t.Run("EmptyTask", func(t *testing.T) {
		entity := sales_entity.Task{}
		dao := TaskDAO{}
		result := dao.FromEntity(entity)

		assert.Equal(t, result.ID, primitive.NilObjectID)

		assert.True(t, result.StartDate.IsZero())
		assert.True(t, result.EndDate.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Title)
		assert.Nil(t, result.IsHot)
		assert.Nil(t, result.Assignee)
		assert.Nil(t, result.Reporter)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Contact)
		assert.Nil(t, result.ContactPhone)
		assert.Nil(t, result.Lead)
		assert.Nil(t, result.Deal)
		assert.Nil(t, result.DurationDays)
		assert.Nil(t, result.DurationHours)
		assert.Nil(t, result.Details)
		assert.Nil(t, result.IsCompleted)
		assert.Nil(t, result.Tag)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledTask", func(t *testing.T) {
		entity := sales_entity.Task{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testTaskID,
				CreatedAt: testTaskCreatedAt,
				UpdatedAt: testTaskUpdatedAt,
			},
			InternalNumber: &testTaskInternalNumber,
			Title:          &testTaskTitle,
			IsHot:          &testTaskIsHot,
			Assignee:       &testTaskAssigneeID,
			Reporter:       &testTaskReporterID,
			Property:       &testTaskPropertyID,
			Contact:        &testTaskContactID,
			ContactPhone:   &testTaskContactPhone,
			Lead:           &testTaskLeadID,
			Deal:           &testTaskDealID,
			StartDate:      testTaskStartDate,
			DurationDays:   &testTaskDurationDays,
			DurationHours:  &testTaskDurationHours,
			Details:        &testTaskDetails,
			IsCompleted:    &testTaskIsCompleted,
			EndDate:        testTaskEndDate,
			Tag:            &testTaskTag,
			IsDeleted:      &testTaskIsDeleted,
		}

		dao := &TaskDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.StartDate.IsZero())
		assert.False(t, result.EndDate.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Title)
		assert.NotNil(t, result.IsHot)
		assert.NotNil(t, result.Assignee)
		assert.NotNil(t, result.Reporter)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Contact)
		assert.NotNil(t, result.ContactPhone)
		assert.NotNil(t, result.Lead)
		assert.NotNil(t, result.Deal)
		assert.NotNil(t, result.DurationDays)
		assert.NotNil(t, result.DurationHours)
		assert.NotNil(t, result.Details)
		assert.NotNil(t, result.IsCompleted)
		assert.NotNil(t, result.Tag)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID.Hex(), testTaskID)
		assert.Equal(t, *result.InternalNumber, testTaskInternalNumber)
		assert.Equal(t, *result.Title, testTaskTitle)
		assert.Equal(t, *result.IsHot, testTaskIsHot)
		assert.Equal(t, *utils.StringFromObjectID(result.Assignee), testTaskAssigneeID)
		assert.Equal(t, *utils.StringFromObjectID(result.Reporter), testTaskReporterID)
		assert.Equal(t, *utils.StringFromObjectID(result.Property), testTaskPropertyID)
		assert.Equal(t, *utils.StringFromObjectID(result.Contact), testTaskContactID)
		assert.Equal(t, *result.ContactPhone, testTaskContactPhone)
		assert.Equal(t, *utils.StringFromObjectID(result.Lead), testTaskLeadID)
		assert.Equal(t, *utils.StringFromObjectID(result.Deal), testTaskDealID)
		assert.Equal(t, *result.DurationDays, testTaskDurationDays)
		assert.Equal(t, *result.DurationHours, testTaskDurationHours)
		assert.Equal(t, *result.Details, testTaskDetails)
		assert.Equal(t, *result.IsCompleted, testTaskIsCompleted)
		assert.Equal(t, *result.Tag, testTaskTag)
		assert.Equal(t, *result.IsDeleted, testTaskIsDeleted)
		assert.Equal(t, result.StartDate, testTaskStartDate)
		assert.Equal(t, result.EndDate, testTaskEndDate)
		assert.Equal(t, result.CreatedAt, testTaskCreatedAt)
		assert.Equal(t, result.UpdatedAt, testTaskUpdatedAt)
	})

}

func TestTaskDAO_ToEntity(t *testing.T) {

	t.Run("EmptyTask", func(t *testing.T) {
		dao := TaskDAO{
			ID: testTaskPrimitiveID,
		}

		result := dao.ToEntity()

		assert.Equal(t, result.ID, dao.ID.Hex())

		assert.True(t, result.StartDate.IsZero())
		assert.True(t, result.EndDate.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Title)
		assert.Nil(t, result.IsHot)
		assert.Nil(t, result.Assignee)
		assert.Nil(t, result.Reporter)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Contact)
		assert.Nil(t, result.ContactPhone)
		assert.Nil(t, result.Lead)
		assert.Nil(t, result.Deal)
		assert.Nil(t, result.DurationDays)
		assert.Nil(t, result.DurationHours)
		assert.Nil(t, result.Details)
		assert.Nil(t, result.IsCompleted)
		assert.Nil(t, result.Tag)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledTask", func(t *testing.T) {
		dao := &TaskDAO{
			ID:             testTaskPrimitiveID,
			InternalNumber: &testTaskInternalNumber,
			Title:          &testTaskTitle,
			IsHot:          &testTaskIsHot,
			Assignee:       &testTaskPrimitiveAssigneeID,
			Reporter:       &testTaskPrimitiveReporterID,
			Property:       &testTaskPrimitivePropertyID,
			Contact:        &testTaskPrimitiveContactID,
			ContactPhone:   &testTaskContactPhone,
			Lead:           &testTaskPrimitiveLeadID,
			Deal:           &testTaskPrimitiveDealID,
			StartDate:      testTaskStartDate,
			DurationDays:   &testTaskDurationDays,
			DurationHours:  &testTaskDurationHours,
			Details:        &testTaskDetails,
			IsCompleted:    &testTaskIsCompleted,
			EndDate:        testTaskEndDate,
			Tag:            &testTaskTag,
			IsDeleted:      &testTaskIsDeleted,
			CreatedAt:      testTaskCreatedAt,
			UpdatedAt:      testTaskUpdatedAt,
		}

		result := dao.ToEntity()

		assert.False(t, result.StartDate.IsZero())
		assert.False(t, result.EndDate.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Title)
		assert.NotNil(t, result.IsHot)
		assert.NotNil(t, result.Assignee)
		assert.NotNil(t, result.Reporter)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Contact)
		assert.NotNil(t, result.ContactPhone)
		assert.NotNil(t, result.Lead)
		assert.NotNil(t, result.Deal)
		assert.NotNil(t, result.DurationDays)
		assert.NotNil(t, result.DurationHours)
		assert.NotNil(t, result.Details)
		assert.NotNil(t, result.IsCompleted)
		assert.NotNil(t, result.Tag)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID, dao.ID.Hex())
		assert.Equal(t, *result.InternalNumber, testTaskInternalNumber)
		assert.Equal(t, *result.Title, testTaskTitle)
		assert.Equal(t, *result.IsHot, testTaskIsHot)
		assert.Equal(t, *result.Assignee, *utils.StringFromObjectID(&testTaskPrimitiveAssigneeID))
		assert.Equal(t, *result.Reporter, *utils.StringFromObjectID(&testTaskPrimitiveReporterID))
		assert.Equal(t, *result.Property, *utils.StringFromObjectID(&testTaskPrimitivePropertyID))
		assert.Equal(t, *result.Contact, *utils.StringFromObjectID(&testTaskPrimitiveContactID))
		assert.Equal(t, *result.ContactPhone, testTaskContactPhone)
		assert.Equal(t, *result.Lead, *utils.StringFromObjectID(&testTaskPrimitiveLeadID))
		assert.Equal(t, *result.Deal, *utils.StringFromObjectID(&testTaskPrimitiveDealID))
		assert.Equal(t, *result.DurationDays, testTaskDurationDays)
		assert.Equal(t, *result.DurationHours, testTaskDurationHours)
		assert.Equal(t, *result.Details, testTaskDetails)
		assert.Equal(t, *result.IsCompleted, testTaskIsCompleted)
		assert.Equal(t, *result.Tag, testTaskTag)
		assert.Equal(t, *result.IsDeleted, testTaskIsDeleted)
		assert.Equal(t, result.StartDate, testTaskStartDate)
		assert.Equal(t, result.EndDate, testTaskEndDate)
		assert.Equal(t, result.CreatedAt, testTaskCreatedAt)
		assert.Equal(t, result.UpdatedAt, testTaskUpdatedAt)
	})
}

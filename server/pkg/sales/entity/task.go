package sales_entity

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Task struct {
	shared_entity.BaseDocument

	InternalNumber *int
	Title          *string

	IsHot         *bool
	Label         *TaskLabel
	Status        *TaskStatus
	Assignee      *string
	Reporter      *string
	Property      *string
	Contact       *string
	ContactPhone  *string
	Lead          *string
	Deal          *string
	StartDate     time.Time
	DurationDays  *int
	DurationHours *int
	Details       *string
	IsCompleted   *bool
	EndDate       time.Time
	Tag           *string
	IsDeleted     *bool
}

type TaskStatus string

const (
	TaskStatusUnset      TaskStatus = ""
	TaskStatusNew        TaskStatus = "NEW"
	TaskStatusInProgress TaskStatus = "IN_PROGRESS"
	TaskStatusClosed     TaskStatus = "CLOSED"
	TaskStatusCompleted  TaskStatus = "COMPLETED"
	TaskStatusOverdue    TaskStatus = "OVERDUE"
)

type TaskLabel string

const (
	TaskLabelUnset     TaskLabel = ""
	TaskLabelImportant TaskLabel = "IMPORTANT"
	TaskLabelNotMatter TaskLabel = "NO_MATTER"
)

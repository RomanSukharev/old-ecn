package sales_entity

import "time"

type TaskFilter struct {
	Keyword      *string
	Status       *TaskStatus
	Label        *TaskLabel
	Phone        *string
	Assignee     *string
	Deal         *string
	Reporter     *string
	Contact      *string
	Lead         *string
	Property     *string
	IsHot        *bool
	CreatedAtMin time.Time
	CreatedAtMax time.Time
}

type TaskSort int

const (
	TaskSortDefault TaskSort = iota
	TaskSortCreatedAtAsc
	TaskSortCreatedAtDesc
)

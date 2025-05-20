package crm_models

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Task struct {
	ID string `json:"id"`

	InternalNumber *int            `json:"internalNumber,omitempty"`
	Title          *string         `json:"title,omitempty"`
	Label          *TaskLabelEnum  `json:"label,omitempty"`
	IsHot          *bool           `json:"isHot,omitempty"`
	Status         *TaskStatusEnum `json:"status,omitempty"`
	AssigneeID     *string         `json:"-"`
	ReporterID     *string         `json:"-"`
	PropertyID     *string         `json:"-"`
	ContactID      *string         `json:"-"`
	ContactPhone   *string         `json:"contactPhone,omitempty"`
	LeadID         *string         `json:"-"`
	DealID         *string         `json:"-"`
	StartDate      time.Time       `json:"startDate,omitempty"`
	DurationDays   *int            `json:"durationDays,omitempty"`
	DurationHours  *int            `json:"durationHours,omitempty"`
	Details        *string         `json:"details,omitempty"`
	IsCompleted    *bool           `json:"isCompleted,omitempty"`
	EndDate        time.Time       `json:"endDate,omitempty"`
	Tag            *string         `json:"tag,omitempty"`
	IsDeleted      *bool           `json:"isDeleted,omitempty"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (t *Task) FromEntity(s *sales_entity.Task) *Task {
	return &Task{
		ID:             s.ID,
		InternalNumber: s.InternalNumber,
		Title:          s.Title,
		Label:          (*TaskLabelEnum)(s.Label),
		IsHot:          s.IsHot,
		Status:         (*TaskStatusEnum)(s.Status),
		AssigneeID:     s.Assignee,
		ReporterID:     s.Reporter,
		PropertyID:     s.Property,
		ContactID:      s.Contact,
		ContactPhone:   s.ContactPhone,
		LeadID:         s.Lead,
		DealID:         s.Deal,
		StartDate:      s.StartDate,
		DurationDays:   s.DurationDays,
		DurationHours:  s.DurationHours,
		Details:        s.Details,
		IsCompleted:    s.IsCompleted,
		EndDate:        s.EndDate,
		Tag:            s.Tag,
		IsDeleted:      s.IsDeleted,
		CreatedAt:      s.CreatedAt,
		UpdatedAt:      s.UpdatedAt,
	}
}

type TaskInput struct {
	ID string `json:"id,omitempty"`

	Title         *string         `json:"title,omitempty"`
	Status        *TaskStatusEnum `json:"status,omitempty"`
	Label         *TaskLabelEnum  `json:"label,omitempty"`
	IsHot         *bool           `json:"isHot,omitempty"`
	AssigneeID    *string         `json:"assigneeId,omitempty"`
	ReporterID    *string         `json:"reporterId,omitempty"`
	PropertyID    *string         `json:"propertyId,omitempty"`
	ContactID     *string         `json:"contactId,omitempty"`
	ContactPhone  *string         `json:"contactPhone,omitempty"`
	LeadID        *string         `json:"leadId,omitempty"`
	DealID        *string         `json:"dealId,omitempty"`
	StartDate     time.Time       `json:"startDate,omitempty"`
	DurationDays  *int            `json:"durationDays,omitempty"`
	DurationHours *int            `json:"durationHours,omitempty"`
	Details       *string         `json:"details,omitempty"`
	Tag           *string         `json:"tag,omitempty"`
}

func (t *TaskInput) ToEntity() *sales_entity.Task {
	return &sales_entity.Task{
		BaseDocument: shared_entity.BaseDocument{
			ID: t.ID,
		},
		Title:         t.Title,
		Label:         (*sales_entity.TaskLabel)(t.Label),
		Status:        (*sales_entity.TaskStatus)(t.Status),
		IsHot:         t.IsHot,
		Assignee:      t.AssigneeID,
		Reporter:      t.ReporterID,
		Property:      t.PropertyID,
		Contact:       t.ContactID,
		ContactPhone:  t.ContactPhone,
		Lead:          t.LeadID,
		Deal:          t.DealID,
		StartDate:     t.StartDate,
		DurationDays:  t.DurationDays,
		DurationHours: t.DurationHours,
		Details:       t.Details,
		Tag:           t.Tag,
	}
}

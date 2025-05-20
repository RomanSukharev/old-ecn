package sales_mongodb_dao

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type TaskDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	InternalNumber *int                     `bson:"internalNumber,omitempty"`
	Title          *string                  `bson:"title,omitempty"`
	Label          *sales_entity.TaskLabel  `bson:"label,omitempty"`
	IsHot          *bool                    `bson:"isHot,omitempty"`
	Status         *sales_entity.TaskStatus `bson:"status,omitempty"`
	Assignee       *primitive.ObjectID      `bson:"assignee,omitempty"`
	Reporter       *primitive.ObjectID      `bson:"reporter,omitempty"`
	Property       *primitive.ObjectID      `bson:"property,omitempty"`
	Contact        *primitive.ObjectID      `bson:"contact,omitempty"`
	ContactPhone   *string                  `bson:"contactPhone,omitempty"`
	Lead           *primitive.ObjectID      `bson:"lead,omitempty"`
	Deal           *primitive.ObjectID      `bson:"deal,omitempty"`
	StartDate      time.Time                `bson:"startDate,omitempty"`
	DurationDays   *int                     `bson:"durationDays,omitempty"`
	DurationHours  *int                     `bson:"durationHours,omitempty"`
	Details        *string                  `bson:"details,omitempty"`
	IsCompleted    *bool                    `bson:"isCompleted,omitempty"`
	EndDate        time.Time                `bson:"endDate,omitempty"`
	Tag            *string                  `bson:"tag,omitempty"`
	IsDeleted      *bool                    `bson:"isDeleted,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *TaskDAO) FromEntity(entity sales_entity.Task) *TaskDAO {
	*dao = TaskDAO{
		InternalNumber: entity.InternalNumber,
		Title:          entity.Title,
		Label:          entity.Label,
		IsHot:          entity.IsHot,
		Status:         entity.Status,
		ContactPhone:   entity.ContactPhone,
		StartDate:      entity.StartDate,
		DurationDays:   entity.DurationDays,
		DurationHours:  entity.DurationHours,
		Details:        entity.Details,
		IsCompleted:    entity.IsCompleted,
		EndDate:        entity.EndDate,
		Tag:            entity.Tag,
		IsDeleted:      entity.IsDeleted,
		CreatedAt:      entity.CreatedAt,
		UpdatedAt:      entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Assignee); err == nil {
		dao.Assignee = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Reporter); err == nil {
		dao.Reporter = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Property); err == nil {
		dao.Property = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Contact); err == nil {
		dao.Contact = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Lead); err == nil {
		dao.Lead = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Deal); err == nil {
		dao.Deal = eid
	}

	return dao
}

func (dao *TaskDAO) ToEntity() *sales_entity.Task {
	return &sales_entity.Task{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},

		InternalNumber: dao.InternalNumber,
		Title:          dao.Title,
		Label:          dao.Label,
		IsHot:          dao.IsHot,
		Status:         dao.Status,
		Assignee:       utils.StringFromObjectID(dao.Assignee),
		Reporter:       utils.StringFromObjectID(dao.Reporter),
		Property:       utils.StringFromObjectID(dao.Property),
		Contact:        utils.StringFromObjectID(dao.Contact),
		ContactPhone:   dao.ContactPhone,
		Lead:           utils.StringFromObjectID(dao.Lead),
		Deal:           utils.StringFromObjectID(dao.Deal),
		StartDate:      dao.StartDate,
		DurationDays:   dao.DurationDays,
		DurationHours:  dao.DurationHours,
		Details:        dao.Details,
		IsCompleted:    dao.IsCompleted,
		EndDate:        dao.EndDate,
		Tag:            dao.Tag,
		IsDeleted:      dao.IsDeleted,
	}
}

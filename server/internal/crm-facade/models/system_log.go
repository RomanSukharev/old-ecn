package crm_models

import (
	"time"

	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
)

type Log struct {
	ID        string         `json:"id"`
	Eid       *string        `json:"eid,omitempty"`
	AuthorID  *string        `json:"-"`
	Status    StatusCodeEnum `json:"status"`
	Type      LogTypeEnum    `json:"type"`
	Level     LogLevelEnum   `json:"level"`
	CreatedAt time.Time      `json:"createdAt"`
}

func (m *Log) FromEntity(e *system_entity.Log) *Log {
	m = &Log{
		ID:        e.ID,
		Eid:       e.EntityID,
		AuthorID:  e.AuthorID,
		Status:    StatusCodeEnum(e.Status),
		Type:      LogTypeEnum(e.Type),
		Level:     LogLevelEnum(e.Level),
		CreatedAt: e.CreatedAt,
	}

	return m
}

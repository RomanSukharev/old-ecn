package crm_models

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type Position struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (m *Position) FromEntity(e *staff_entity.Position) *Position {
	m = &Position{
		ID:        e.ID,
		Title:     e.Title,
		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
	}

	return m
}

type PositionInput struct {
	ID    string `json:"id,omitempty"`
	Title string `json:"title"`
}

func (m *PositionInput) ToEntity() *staff_entity.Position {
	return &staff_entity.Position{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title: m.Title,
	}
}

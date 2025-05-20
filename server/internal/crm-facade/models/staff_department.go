package crm_models

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type Department struct {
	ID        string            `json:"id"`
	Title     string            `json:"title"`
	Groups    []DepartmentGroup `json:"groups"`
	CreatedAt time.Time         `json:"createdAt"`
	UpdatedAt time.Time         `json:"updatedAt"`
}

func (m *Department) FromEntity(e *staff_entity.Department) *Department {
	var groups []DepartmentGroup
	for _, v := range e.Groups {
		groups = append(groups, *new(DepartmentGroup).FromEntity(&v))
	}

	m = &Department{
		ID:        e.ID,
		Title:     e.Title,
		Groups:    groups,
		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
	}

	return m
}

type DepartmentInput struct {
	ID     string                 `json:"id,omitempty"`
	Title  string                 `json:"title,omitempty"`
	Groups []DepartmentGroupInput `json:"groups,omitempty"`
}

func (m *DepartmentInput) ToEntity() *staff_entity.Department {
	var groups []staff_entity.DepartmentGroup
	for _, v := range m.Groups {
		groups = append(groups, *v.ToEntity())
	}

	return &staff_entity.Department{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title:  m.Title,
		Groups: groups,
	}
}

type DepartmentGroup struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (m *DepartmentGroup) FromEntity(e *staff_entity.DepartmentGroup) *DepartmentGroup {
	m = &DepartmentGroup{
		ID:        e.ID,
		Title:     e.Title,
		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
	}

	return m
}

// Входные параметры для группы
type DepartmentGroupInput struct {
	ID    string `json:"id,omitempty"`
	Title string `json:"title"`
}

func (m *DepartmentGroupInput) ToEntity() *staff_entity.DepartmentGroup {
	return &staff_entity.DepartmentGroup{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title: m.Title,
	}
}

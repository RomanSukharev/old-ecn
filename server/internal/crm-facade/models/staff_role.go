package crm_models

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type Role struct {
	ID          string                `json:"id"`
	Title       string                `json:"title"`
	Permissions []RolePermissionsEnum `json:"permissions"`
	CreatedAt   time.Time             `json:"createdAt"`
	UpdatedAt   time.Time             `json:"updatedAt"`
}

func (m *Role) FromEntity(e *staff_entity.Role) *Role {
	permissions := make([]RolePermissionsEnum, 0, len(e.Permissions))
	for _, v := range e.Permissions {
		permissions = append(permissions, RolePermissionsEnum(v))
	}

	m = &Role{
		ID:          e.ID,
		Title:       e.Title,
		Permissions: permissions,
		CreatedAt:   e.CreatedAt,
		UpdatedAt:   e.UpdatedAt,
	}

	return m
}

type RoleInput struct {
	ID          string                `json:"id,omitempty"`
	Title       string                `json:"title"`
	Permissions []RolePermissionsEnum `json:"permissions"`
}

func (m *RoleInput) ToEntity() *staff_entity.Role {
	permissions := make(staff_entity.RolePermissions, 0, len(m.Permissions))
	for _, v := range m.Permissions {
		permissions = append(permissions, staff_entity.RolePermission(v))
	}

	return &staff_entity.Role{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title:       m.Title,
		Permissions: permissions,
	}
}

package crm_models

import (
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type Me struct {
	ID       string  `json:"id"`
	Name     string  `json:"name,omitempty"`
	Surname  string  `json:"surname,omitempty"`
	AvatarID *string `json:"-"`
}

func (m *Me) FromEntity(e *staff_entity.Employee) *Me {
	m = &Me{
		ID:       e.ID,
		Name:     e.Name,
		Surname:  e.Surname,
		AvatarID: e.AvatarID,
	}

	return m
}

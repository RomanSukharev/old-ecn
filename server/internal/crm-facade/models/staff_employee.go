package crm_models

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type Employee struct {
	ID               string    `json:"id"`
	Name             string    `json:"name"`
	Surname          string    `json:"surname"`
	Patronymic       string    `json:"patronymic,omitempty"`
	Birthday         time.Time `json:"birthday,omitempty"`
	Email            string    `json:"email"`
	Phone            string    `json:"phone"`
	PositionID       *string   `json:"-"`
	DepartmentID     *string   `json:"-"`
	GroupID          *string   `json:"-"`
	RoleID           *string   `json:"-"`
	Permissions      []string  `json:"permissions"`
	InternalInfo     string    `json:"internalInfo,omitempty"`
	ShortDescription string    `json:"shortDescription,omitempty"`
	Description      string    `json:"description,omitempty"`
	IsPublished      bool      `json:"isPublished"`
	IsDeleted        bool      `json:"isDeleted"`
	AvatarID         *string   `json:"-"`
	PublicImageID    *string   `json:"-"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

func (m *Employee) FromEntity(e *staff_entity.Employee) *Employee {
	m = &Employee{
		ID:               e.ID,
		Name:             e.Name,
		Surname:          e.Surname,
		Patronymic:       e.Patronymic,
		Birthday:         e.Birthday,
		Email:            e.Email,
		Phone:            e.Phone,
		PositionID:       e.PositionID,
		DepartmentID:     e.DepartmentID,
		GroupID:          e.GroupID,
		RoleID:           e.RoleID,
		Permissions:      e.Permissions.String(),
		InternalInfo:     e.InternalInfo,
		ShortDescription: e.ShortDescription,
		Description:      e.Description,
		IsPublished:      e.IsPublished,
		IsDeleted:        e.IsDeleted,
		AvatarID:         e.AvatarID,
		PublicImageID:    e.PublicImageID,
		CreatedAt:        e.CreatedAt,
		UpdatedAt:        e.UpdatedAt,
	}

	return m
}

type EmployeeInput struct {
	ID               string    `json:"id,omitempty"`
	Name             string    `json:"name,omitempty"`
	Surname          string    `json:"surname,omitempty"`
	Patronymic       string    `json:"patronymic,omitempty"`
	Birthday         time.Time `json:"birthday,omitempty"`
	Email            string    `json:"email,omitempty"`
	Phone            string    `json:"phone,omitempty"`
	Password         string    `json:"password,omitempty"`
	PositionID       *string   `json:"-"`
	DepartmentID     *string   `json:"-"`
	GroupID          *string   `json:"-"`
	RoleID           *string   `json:"-"`
	InternalInfo     string    `json:"internalInfo,omitempty"`
	ShortDescription string    `json:"shortDescription,omitempty"`
	Description      string    `json:"description,omitempty"`
	IsPublished      bool      `json:"isPublished,omitempty"`
	AvatarID         *string   `json:"-"`
	PublicImageID    *string   `json:"-"`
}

func (m *EmployeeInput) ToEntity() *staff_entity.Employee {
	return &staff_entity.Employee{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Name:             m.Name,
		Surname:          m.Surname,
		Patronymic:       m.Patronymic,
		Birthday:         m.Birthday,
		Email:            m.Email,
		Phone:            m.Phone,
		Password:         m.Password,
		PositionID:       m.PositionID,
		DepartmentID:     m.DepartmentID,
		GroupID:          m.GroupID,
		RoleID:           m.RoleID,
		InternalInfo:     m.InternalInfo,
		ShortDescription: m.ShortDescription,
		Description:      m.Description,
		IsPublished:      m.IsPublished,
		AvatarID:         m.AvatarID,
		PublicImageID:    m.PublicImageID,
	}
}

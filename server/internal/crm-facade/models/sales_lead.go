package crm_models

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Lead struct {
	ID               string          `json:"id"`
	InternalNumber   *int            `json:"internalNumber,omitempty"`
	Type             *LeadTypeEnum   `json:"type,omitempty"`
	Source           *LeadSourceEnum `json:"source,omitempty"`
	Name             *string         `json:"name,omitempty"`
	Surname          *string         `json:"surname,omitempty"`
	Patronymic       *string         `json:"patronymic,omitempty"`
	Birthday         *time.Time      `json:"birthday,omitempty"`
	Phone            *string         `json:"phone,omitempty"`
	AdditionalPhones []string        `json:"additionalPhones"`
	Email            *string         `json:"email,omitempty"`
	Company          *string         `json:"company,omitempty"`
	Address          *string         `json:"address,omitempty"`
	Request          *string         `json:"request,omitempty"`
	AgentIDs         []string        `json:"-"`
	Status           *LeadStatusEnum `json:"status,omitempty"`
	Comment          *string         `json:"comment,omitempty"`
	IsDeleted        *bool           `json:"isDeleted"`
	CreatedAt        time.Time       `json:"createdAt"`
	UpdatedAt        time.Time       `json:"updatedAt"`
}

func (l *Lead) FromEntity(s *sales_entity.Lead) *Lead {
	return &Lead{
		ID:               s.ID,
		InternalNumber:   s.InternalNumber,
		Type:             (*LeadTypeEnum)(s.Type),
		Source:           (*LeadSourceEnum)(s.Source),
		Name:             s.Name,
		Surname:          s.Surname,
		Patronymic:       s.Patronymic,
		Birthday:         s.Birthday,
		Phone:            s.Phone,
		AdditionalPhones: s.AdditionalPhones,
		Email:            s.Email,
		Company:          s.Company,
		Address:          s.Address,
		Request:          s.Request,

		AgentIDs:  s.AgentIDs,
		Status:    (*LeadStatusEnum)(s.Status),
		Comment:   s.Comment,
		IsDeleted: s.IsDeleted,
		CreatedAt: s.CreatedAt,
		UpdatedAt: s.UpdatedAt,
	}
}

type LeadInput struct {
	ID               string          `json:"id,omitempty"`
	Type             *LeadTypeEnum   `json:"type,omitempty"`
	Source           *LeadSourceEnum `json:"source,omitempty"`
	Name             *string         `json:"name"`
	Surname          *string         `json:"surname"`
	Patronymic       *string         `json:"patronymic,omitempty"`
	Birthday         *time.Time      `json:"birthday,omitempty"`
	Phone            *string         `json:"phone"`
	AdditionalPhones []string        `json:"additionalPhones"`
	Email            *string         `json:"email"`
	Company          *string         `json:"company,omitempty"`
	Address          *string         `json:"address,omitempty"`
	Request          *string         `json:"request,omitempty"`
	AgentIDs         []string        `json:"agentIDs,omitempty"`
	Status           *LeadStatusEnum `json:"status,omitempty"`
	Comment          *string         `json:"comment,omitempty"`
}

func (l *LeadInput) ToEntity() *sales_entity.Lead {

	return &sales_entity.Lead{
		BaseDocument: shared_entity.BaseDocument{
			ID: l.ID,
		},

		Type:             (*sales_entity.LeadType)(l.Type),
		Source:           (*sales_entity.LeadSource)(l.Source),
		Name:             l.Name,
		Surname:          l.Surname,
		Patronymic:       l.Patronymic,
		Birthday:         l.Birthday,
		Phone:            l.Phone,
		AdditionalPhones: l.AdditionalPhones,
		Email:            l.Email,
		Company:          l.Company,
		Address:          l.Address,
		Request:          l.Request,
		AgentIDs:         l.AgentIDs,
		Status:           (*sales_entity.LeadStatus)(l.Status),
		Comment:          l.Comment,
	}
}

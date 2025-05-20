package crm_models

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Contact struct {
	ID                 string                `json:"id"`
	InternalNumber     *int                  `json:"internalNumber,omitempty"`
	Type               *CounterPartyTypeEnum `json:"type,omitempty"`
	Source             *ContactSourceEnum    `json:"source,omitempty"`
	Name               *string               `json:"name"`
	Surname            *string               `json:"surname"`
	Patronymic         *string               `json:"patronymic,omitempty"`
	Birthday           time.Time             `json:"birthday,omitempty"`
	Phone              *string               `json:"phone"`
	AdditionalPhones   []string              `json:"additionalPhones,omitempty"`
	Email              *string               `json:"email"`
	Company            *string               `json:"company,omitempty"`
	Address            *string               `json:"address,omitempty"`
	PropertyIDs        []string              `json:"-"`
	PassportNumber     *string               `json:"passportNumber,omitempty"`
	PassportIssuedBy   *string               `json:"passportIssuedBy,omitempty"`
	PassportIssueDate  time.Time             `json:"passportIssueDate,omitempty"`
	PassportIssuerCode *string               `json:"passportIssuerCode,omitempty"`
	InternalInfo       *string               `json:"internalInfo,omitempty"`
	Note               *string               `json:"note,omitempty"`
	AgentIDs           []string              `json:"-"`
	DealIDs            []string              `json:"-"`
	ContractIDs        []string              `json:"-"`
	DocumentIDs        []string              `json:"-"`
	LeadID             *string               `json:"leadId,omitempty"`
	IsDeleted          bool                  `json:"isDeleted"`
	CreatedAt          time.Time             `json:"createdAt"`
	UpdatedAt          time.Time             `json:"updatedAt"`
}

func (c *Contact) FromEntity(s *sales_entity.Contact) *Contact {
	return &Contact{
		ID:                 s.ID,
		InternalNumber:     s.InternalNumber,
		Type:               (*CounterPartyTypeEnum)(s.Type),
		Source:             (*ContactSourceEnum)(s.Source),
		Name:               s.Name,
		Surname:            s.Surname,
		Patronymic:         s.Patronymic,
		Birthday:           s.Birthday,
		Phone:              s.Phone,
		AdditionalPhones:   s.AdditionalPhones,
		Email:              s.Email,
		Company:            s.Company,
		Address:            s.Address,
		PropertyIDs:        s.PropertyIDs,
		PassportNumber:     s.PassportNumber,
		PassportIssuedBy:   s.PassportIssusedBy,
		PassportIssueDate:  s.PassportIssueDate,
		PassportIssuerCode: s.PassportIssuerCode,
		InternalInfo:       s.InternalInfo,
		Note:               s.Note,
		AgentIDs:           s.AgentIDs,
		DealIDs:            s.DealIDs,
		ContractIDs:        s.ContractIDs,
		DocumentIDs:        s.DocumentIDs,
		LeadID:             s.LeadID,
		IsDeleted:          *s.IsDeleted,
		CreatedAt:          s.CreatedAt,
		UpdatedAt:          s.UpdatedAt,
	}
}

type ContactInput struct {
	ID                 string                `json:"id,omitempty"`
	Type               *CounterPartyTypeEnum `json:"type,omitempty"`
	Source             *ContactSourceEnum    `json:"source,omitempty"`
	Name               *string               `json:"name"`
	Surname            *string               `json:"surname"`
	Patronymic         *string               `json:"patronymic,omitempty"`
	Birthday           time.Time             `json:"birthday,omitempty"`
	Phone              *string               `json:"phone"`
	AdditionalPhones   []string              `json:"additionalPhones,omitempty"`
	Email              *string               `json:"email"`
	Company            *string               `json:"company,omitempty"`
	Address            *string               `json:"address,omitempty"`
	PropertyIDs        []string              `json:"propertyIDs,omitempty"`
	PassportNumber     *string               `json:"passportNumber,omitempty"`
	PassportIssuedBy   *string               `json:"passportIssuedBy,omitempty"`
	PassportIssueDate  time.Time             `json:"passportIssueDate"`
	PassportIssuerCode *string               `json:"passportIssuerCode,omitempty"`
	InternalInfo       *string               `json:"internalInfo,omitempty"`
	Note               *string               `json:"note,omitempty"`
	AgentIDs           []string              `json:"agentIDs,omitempty"`
	DealIDs            []string              `json:"dealIDs,omitempty"`
	ContractIDs        []string              `json:"contractIDs,omitempty"`
	DocumentIDs        []string              `json:"documentIDs,omitempty"`
	LeadID             *string               `json:"leadId,omitempty"`
}

func (c *ContactInput) ToEntity() *sales_entity.Contact {
	return &sales_entity.Contact{
		BaseDocument: shared_entity.BaseDocument{
			ID: c.ID,
		},

		Type:               (*sales_entity.CounterPartyType)(c.Type),
		Source:             (*sales_entity.ContactSource)(c.Source),
		Name:               c.Name,
		Surname:            c.Surname,
		Patronymic:         c.Patronymic,
		Birthday:           c.Birthday,
		Phone:              c.Phone,
		AdditionalPhones:   c.AdditionalPhones,
		Email:              c.Email,
		Company:            c.Company,
		Address:            c.Address,
		PropertyIDs:        c.PropertyIDs,
		PassportNumber:     c.PassportNumber,
		PassportIssusedBy:  c.PassportIssuedBy,
		PassportIssueDate:  c.PassportIssueDate,
		PassportIssuerCode: c.PassportIssuerCode,
		InternalInfo:       c.InternalInfo,
		Note:               c.Note,
		AgentIDs:           c.AgentIDs,
		DealIDs:            c.DealIDs,
		ContractIDs:        c.ContractIDs,
		DocumentIDs:        c.DocumentIDs,
		LeadID:             c.LeadID,
	}
}

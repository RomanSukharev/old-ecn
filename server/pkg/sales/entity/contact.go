package sales_entity

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Contact struct {
	shared_entity.BaseDocument

	InternalNumber     *int
	Type               *CounterPartyType
	Source             *ContactSource
	Name               *string
	Surname            *string
	Patronymic         *string
	Birthday           time.Time
	Phone              *string
	AdditionalPhones   []string
	Email              *string
	Company            *string
	Address            *string
	PropertyIDs        []string
	PassportNumber     *string
	PassportIssusedBy  *string
	PassportIssueDate  time.Time
	PassportIssuerCode *string
	InternalInfo       *string
	Note               *string
	AgentIDs           []string
	DealIDs            []string
	ContractIDs        []string
	DocumentIDs        []string
	LeadID             *string
	IsDeleted          *bool
}

type CounterPartyType string

const (
	CounterPartyTypeUnset CounterPartyType = ""
	CounterPartyTypeSaler CounterPartyType = "SALER"
	CounterPartyTypeBuyer CounterPartyType = "BUYER"
	CounterPartyTypeBoth  CounterPartyType = "BOTH"
)

type ContactSource string

const (
	ContactSourceUnset ContactSource = ""
)

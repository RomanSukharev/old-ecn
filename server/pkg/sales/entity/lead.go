package sales_entity

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Lead struct {
	shared_entity.BaseDocument

	InternalNumber   *int
	Type             *LeadType
	Source           *LeadSource
	Name             *string
	Surname          *string
	Patronymic       *string
	Birthday         *time.Time
	Phone            *string
	AdditionalPhones []string
	Email            *string
	Company          *string
	Address          *string
	Request          *string
	AgentIDs         []string
	Status           *LeadStatus
	Comment          *string
	IsDeleted        *bool
}

type LeadType string

const (
	LeadTypeUnset LeadType = ""
	LeadTypeSaler LeadType = "SALER"
	LeadTypeBuyer LeadType = "BUYER"
	LeadTypeBoth  LeadType = "BOTH"
)

type LeadStatus string

const (
	LeadStatusUnset      LeadStatus = ""
	LeadStatusNew        LeadStatus = "NEW"
	LeadStatusInProgress LeadStatus = "IN_PROGRESS"
	LeadStatusRefused    LeadStatus = "REFUSED"
	LeadStatusSuccess    LeadStatus = "SUCCESS"
	LeadStatusThinking   LeadStatus = "THINKING"
)

type LeadSource string

const (
	LeadSourceUnset LeadSource = ""
)

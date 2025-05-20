package sales_entity

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type MortgageRequest struct {
	shared_entity.BaseDocument

	InternalNumber *int
	Status         *MortgageRequestStatus
	Contact        *string
	Banks          []string
	MortgageBroker *string
	Agent          *string
	Deal           *string
	Property       *string
	Amount         *float64
	FirstDeposit   *float64
	Period         *int
	Comment        *string
	Contracts      []string
	Documents      []string
	SendDate       time.Time
	ResponseDate   time.Time
	ValidTillDate  time.Time
	Percentage     *float64
	IsDeleted      *bool
}

type MortgageRequestStatus string

const (
	MortgageRequestStatusUnset          MortgageRequestStatus = ""
	MortgageRequestStatusSent           MortgageRequestStatus = "SENT"
	MortgageRequestStatusApproved       MortgageRequestStatus = "APPROVED"
	MortgageRequestStatusRefusal        MortgageRequestStatus = "REFUSAL"
	MortgageRequestStatusObjectApproval MortgageRequestStatus = "OBJECT_APPROVAL"
)

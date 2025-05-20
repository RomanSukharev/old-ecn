package sales_entity

import (
	"time"
)

type MortgageRequestFilter struct {
	Keyword        *string
	Status         *MortgageRequestStatus
	MortgageBroker *string
	Agent          *string
	Contact        *string
	Property       *string
	Deal           *string
	Amount         *float64
	FirstDeposit   *float64
	Period         *int
	Percentage     *float64
	SendDate       time.Time
	ResponseDate   time.Time
	CreatedAtMin   time.Time
	CreatedAtMax   time.Time
}

type MortgageRequestSort int

const (
	MortgageRequestSortDefault MortgageRequestSort = iota
	MortgageRequestCreatedAtAsc
	MortgageRequestCreatedAtDesc
)

package sales_entity

import "time"

type LeadFilter struct {
	Keyword      *string
	Phone        *string
	Email        *string
	Company      *string
	Type         *LeadType
	Status       *LeadStatus
	CreatedAtMin time.Time
	CreatedAtMax time.Time
}

type LeadSort int

const (
	LeadSortDefault LeadSort = iota
	LeadSortCreatedAtAsc
	LeadSortCreatedAtDesc
)

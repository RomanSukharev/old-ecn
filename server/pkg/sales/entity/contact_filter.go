package sales_entity

import "time"

type ContactFilter struct {
	Keyword      *string
	Phone        *string
	Email        *string
	Type         *CounterPartyType
	Company      *string
	Address      *string
	Employee     *string
	CreatedAtMin time.Time
	CreatedAtMax time.Time
}

type ContactSort int

const (
	ContactSortDefault = iota
	ContactSortCreatedAtAsc
	ContactSortCreatedAtDesc
)

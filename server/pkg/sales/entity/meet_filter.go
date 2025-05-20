package sales_entity

import "time"

type MeetFilter struct {
	Keyword       *string
	Type          *MeetType
	DealType      *DealType
	SellerAgent   *string
	BuyerAgent    *string
	SellerContact *string
	BuyerContact  *string
	Status        []MeetStatus
	Property      *string
	Phone         *string
	Address       *string
	CreatedAtMin  time.Time
	CreatedAtMax  time.Time
}

type MeetSort int

const (
	MeetSortDefault MeetSort = iota
	MeetSortCreatedAtAsc
	MeetSortCreatedAtDesc
)

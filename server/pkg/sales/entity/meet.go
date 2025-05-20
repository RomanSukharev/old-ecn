package sales_entity

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Meet struct {
	shared_entity.BaseDocument

	InternalNumber     *int
	Type               *MeetType
	ContactType        *CounterPartyType
	DealType           *DealType
	DateTime           time.Time
	Property           *string
	Address            *string
	Comment            *string
	IsOnline           *bool
	SellerAgent        *string
	SellerContact      *string
	SellerPhone        *string
	BuyerAgent         *string
	BuyerContact       *string
	BuyerPhone         *string
	BuyerAgency        *string
	Status             *MeetStatus
	CancelReason       *MeetCancelReason
	CancelReasonCustom *string
	UseDealDeposit     *bool
	Lawer              *string
	Accountant         *string
	MortgageBroker     *string
	UseMortgage        *bool
	IsDeleted          *bool
}

type MeetType string

const (
	MeetTypeUnset MeetType = ""
	MeetTypeRent  MeetType = "RENT"
	MeetTypeSale  MeetType = "SALE"
)

type MeetStatus string

const (
	MeetStatusUnset       MeetStatus = ""
	MeetStatusGoingOnSale MeetStatus = "GOING_ON_SALE"
	MeetStatusCancelled   MeetStatus = "CANCELLED"
)

type MeetCancelReason string

const (
	MeetCancelReasonUnset       MeetCancelReason = ""
	MeetCancelReasonChangedMind MeetCancelReason = "CHANGED_MIND"
	MeetCancelReasonRefusal     MeetCancelReason = "REFUSAL"
	MeetCancelReasonOwnOpinion  MeetCancelReason = "OWN_OPINION"
)

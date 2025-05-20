package sales_entity

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Deal struct {
	shared_entity.BaseDocument

	InternalNumber      *int
	Type                *DealType
	Stage               *DealStage
	SellerAgent         *string
	SellerContact       *string
	SellerPhone         *string
	SellerDocuments     []string
	BuyerAgent          *string
	BuyerContact        *string
	BuyerPhone          *string
	BuyerDocuments      []string
	Property            *string
	Address             *string
	MortgageBroker      *string
	MortgageRequest     *string
	MortgageDocuments   []string
	Lawer               *string
	LawerDocuments      []string
	Accountant          *string
	AccountantDocuments []string
	DepositDate         time.Time
	DealDate            time.Time
	FinishedAt          time.Time
	CommisionAmount     *float64
	InternalComment     *string
	IsDeleted           *bool
}

type DealType string

const (
	DealTypeUnset    DealType = ""
	DealTypePurchase DealType = "PURCHASE"
	DealTypeSale     DealType = "SALE"
)

type DealStage string

const (
	DealStageUnset              DealStage = ""
	DealStageDepositPreparation DealStage = "DEPOSIT_PREPARATION"
	DealStageDeposit            DealStage = "DEPOSIT_PAID"
	DealStageScheduled          DealStage = "SCHEDULED_FOR_DEAL"
	DealStageMFCRegistration    DealStage = "MFC_REGISTRATION"
	DealStageRegistered         DealStage = "REGISTERED"
)

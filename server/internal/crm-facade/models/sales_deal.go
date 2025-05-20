package crm_models

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Deal struct {
	ID                    string         `json:"id"`
	InternalNumber        *int           `json:"internalNumber,omitempty"`
	Type                  *DealTypeEnum  `json:"type,omitempty"`
	Stage                 *DealStageEnum `json:"stage,omitempty"`
	SellerAgentID         *string        `json:"-"`
	SellerContactID       *string        `json:"-"`
	SellerPhone           *string        `json:"sellerPhone,omitempty"`
	SellerDocumentIDs     []string       `json:"-"`
	BuyerAgentID          *string        `json:"-"`
	BuyerContactID        *string        `json:"-"`
	BuyerPhone            *string        `json:"buyerPhone,omitempty"`
	BuyerDocumentIDs      []string       `json:"-"`
	PropertyID            *string        `json:"-"`
	Address               *string        `json:"address,omitempty"`
	MortgageBrokerID      *string        `json:"-"`
	MortgageRequestID     *string        `json:"-"`
	MortgageDocumentIDs   []string       `json:"-"`
	LawerID               *string        `json:"-"`
	LawerDocumentIDs      []string       `json:"-"`
	AccountantID          *string        `json:"-"`
	AccountantDocumentIDs []string       `json:"-"`
	DepositDate           time.Time      `json:"depositDate,omitempty"`
	DealDate              time.Time      `json:"dealDate,omitempty"`
	FinishedAt            time.Time      `json:"finishedAt,omitempty"`
	CommissionAmount      *float64       `json:"commissionAmount,omitempty"`
	InternalComment       *string        `json:"internalComment,omitempty"`
	IsDeleted             *bool          `json:"isDeleted,omitempty"`
	CreatedAt             time.Time      `json:"createdAt,omitempty"`
	UpdatedAt             time.Time      `json:"updatedAt,omitempty"`
}

func (d *Deal) FromEntity(s *sales_entity.Deal) *Deal {
	return &Deal{
		ID:                    s.ID,
		InternalNumber:        s.InternalNumber,
		Type:                  (*DealTypeEnum)(s.Type),
		Stage:                 (*DealStageEnum)(s.Stage),
		SellerAgentID:         s.SellerAgent,
		SellerContactID:       s.SellerContact,
		SellerPhone:           s.SellerPhone,
		SellerDocumentIDs:     s.SellerDocuments,
		BuyerAgentID:          s.BuyerAgent,
		BuyerContactID:        s.BuyerContact,
		BuyerPhone:            s.BuyerPhone,
		BuyerDocumentIDs:      s.BuyerDocuments,
		PropertyID:            s.Property,
		Address:               s.Address,
		MortgageBrokerID:      s.MortgageBroker,
		MortgageRequestID:     s.MortgageRequest,
		MortgageDocumentIDs:   s.MortgageDocuments,
		LawerID:               s.Lawer,
		LawerDocumentIDs:      s.LawerDocuments,
		AccountantID:          s.Accountant,
		AccountantDocumentIDs: s.AccountantDocuments,
		DepositDate:           s.DepositDate,
		DealDate:              s.DealDate,
		FinishedAt:            s.FinishedAt,
		CommissionAmount:      s.CommisionAmount,
		InternalComment:       s.InternalComment,
		IsDeleted:             s.IsDeleted,
		CreatedAt:             s.CreatedAt,
		UpdatedAt:             s.UpdatedAt,
	}
}

type DealInput struct {
	ID                    string         `json:"id,omitempty"`
	Type                  *DealTypeEnum  `json:"type,omitempty"`
	Stage                 *DealStageEnum `json:"stage,omitempty"`
	SellerAgentID         *string        `json:"sellerAgentId,omitempty"`
	SellerContactID       *string        `json:"sellerContactId,omitempty"`
	SellerPhone           *string        `json:"sellerPhone,omitempty"`
	SellerDocumentIDs     []string       `json:"sellerDocumentIds,omitempty"`
	BuyerAgentID          *string        `json:"buyerAgentId,omitempty"`
	BuyerContactID        *string        `json:"buyerContactId,omitempty"`
	BuyerPhone            *string        `json:"buyerPhone,omitempty"`
	BuyerDocumentIDs      []string       `json:"buyerDocumentIds,omitempty"`
	PropertyID            *string        `json:"propertyId,omitempty"`
	Address               *string        `json:"address,omitempty"`
	MortgageBrokerID      *string        `json:"mortgageBrokerId,omitempty"`
	MortgageRequestID     *string        `json:"mortgageRequestId,omitempty"`
	MortgageDocumentIDs   []string       `json:"mortgageDocumentIds,omitempty"`
	LawerID               *string        `json:"lawerId,omitempty"`
	LawerDocumentIDs      []string       `json:"lawerDocumentIds,omitempty"`
	AccountantID          *string        `json:"accountantId,omitempty"`
	AccountantDocumentIDs []string       `json:"accountantDocumentIds,omitempty"`
	DepositDate           time.Time      `json:"depositDate,omitempty"`
	DealDate              time.Time      `json:"dealDate,omitempty"`
	CommissionAmount      *float64       `json:"commissionAmount,omitempty"`
	InternalComment       *string        `json:"internalComment,omitempty"`
}

func (d *DealInput) ToEntity() *sales_entity.Deal {
	return &sales_entity.Deal{
		BaseDocument: shared_entity.BaseDocument{
			ID: d.ID,
		},
		Type:                (*sales_entity.DealType)(d.Type),
		Stage:               (*sales_entity.DealStage)(d.Stage),
		SellerAgent:         d.SellerAgentID,
		SellerContact:       d.SellerContactID,
		SellerPhone:         d.SellerPhone,
		SellerDocuments:     d.SellerDocumentIDs,
		BuyerAgent:          d.BuyerAgentID,
		BuyerContact:        d.BuyerContactID,
		BuyerPhone:          d.BuyerPhone,
		BuyerDocuments:      d.BuyerDocumentIDs,
		Property:            d.PropertyID,
		Address:             d.Address,
		MortgageBroker:      d.MortgageBrokerID,
		MortgageRequest:     d.MortgageRequestID,
		MortgageDocuments:   d.MortgageDocumentIDs,
		Lawer:               d.LawerID,
		LawerDocuments:      d.LawerDocumentIDs,
		Accountant:          d.AccountantID,
		AccountantDocuments: d.AccountantDocumentIDs,
		DepositDate:         d.DepositDate,
		DealDate:            d.DealDate,
		CommisionAmount:     d.CommissionAmount,
		InternalComment:     d.InternalComment,
	}
}

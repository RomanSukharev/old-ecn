package crm_models

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Meet struct {
	ID                 string                `json:"id"`
	InternalNumber     *int                  `json:"internalNumber,omitempty"`
	Type               *MeetTypeEnum         `json:"type,omitempty"`
	ContactType        *CounterPartyTypeEnum `json:"contactType,omitempty"`
	DealType           *DealTypeEnum         `json:"dealType,omitempty"`
	DateTime           time.Time             `json:"dateTime,omitempty"`
	PropertyID         *string               `json:"-"`
	Address            *string               `json:"address,omitempty"`
	Comment            *string               `json:"comment,omitempty"`
	IsOnline           *bool                 `json:"isOnline,omitempty"`
	SellerAgentID      *string               `json:"-"`
	SellerContactID    *string               `json:"-"`
	SellerPhone        *string               `json:"sellerPhone,omitempty"`
	BuyerAgentID       *string               `json:"-"`
	BuyerContactID     *string               `json:"-"`
	BuyerPhone         *string               `json:"buyerPhone,omitempty"`
	BuyerAgency        *string               `json:"buyerAgency,omitempty"`
	Status             *MeetStatusEnum       `json:"status,omitempty"`
	CancelReason       *MeetCancelReasonEnum `json:"cancelReason,omitempty"`
	CancelReasonCustom *string               `json:"cancelReasonCustom,omitempty"`
	UseDealDeposit     *bool                 `json:"useDealDeposit,omitempty"`
	LawerID            *string               `json:"-"`
	AccountantID       *string               `json:"-"`
	MortgageBrokerID   *string               `json:"-"`
	UseMortgage        *bool                 `json:"useMortgage,omitempty"`
	IsDeleted          *bool                 `json:"isDeleted"`
	CreatedAt          time.Time             `json:"createdAt"`
	UpdatedAt          time.Time             `json:"updatedAt"`
}

func (m *Meet) FromEntity(s *sales_entity.Meet) *Meet {
	return &Meet{
		ID:                 s.ID,
		InternalNumber:     s.InternalNumber,
		Type:               (*MeetTypeEnum)(s.Type),
		ContactType:        (*CounterPartyTypeEnum)(s.ContactType),
		DealType:           (*DealTypeEnum)(s.DealType),
		DateTime:           s.DateTime,
		PropertyID:         s.Property,
		Address:            s.Address,
		Comment:            s.Comment,
		IsOnline:           s.IsOnline,
		SellerAgentID:      s.SellerAgent,
		SellerContactID:    s.SellerContact,
		SellerPhone:        s.SellerPhone,
		BuyerAgentID:       s.BuyerAgent,
		BuyerContactID:     s.BuyerContact,
		BuyerPhone:         s.BuyerPhone,
		BuyerAgency:        s.BuyerAgency,
		Status:             (*MeetStatusEnum)(s.Status),
		CancelReason:       (*MeetCancelReasonEnum)(s.CancelReason),
		CancelReasonCustom: s.CancelReasonCustom,
		UseDealDeposit:     s.UseDealDeposit,
		LawerID:            s.Lawer,
		AccountantID:       s.Accountant,
		MortgageBrokerID:   s.MortgageBroker,
		UseMortgage:        s.UseMortgage,
		IsDeleted:          s.IsDeleted,
		CreatedAt:          s.CreatedAt,
		UpdatedAt:          s.UpdatedAt,
	}
}

type MeetInput struct {
	ID                 string                `json:"id,omitempty"`
	Type               *MeetTypeEnum         `json:"type,omitempty"`
	DealType           *DealTypeEnum         `json:"dealType,omitempty"`
	ContactType        *CounterPartyTypeEnum `json:"contactType,omitempty"`
	DateTime           time.Time             `json:"dateTime,omitempty"`
	PropertyID         *string               `json:"propertyId,omitempty"`
	Address            *string               `json:"address,omitempty"`
	Comment            *string               `json:"comment,omitempty"`
	IsOnline           *bool                 `json:"isOnline,omitempty"`
	SellerAgentID      *string               `json:"sellerAgentId,omitempty"`
	SellerContactID    *string               `json:"sellerContactId,omitempty"`
	SellerPhone        *string               `json:"sellerPhone,omitempty"`
	BuyerAgentID       *string               `json:"buyerAgentId,omitempty"`
	BuyerContactID     *string               `json:"buyerContactId,omitempty"`
	BuyerPhone         *string               `json:"buyerPhone,omitempty"`
	BuyerAgency        *string               `json:"buyerAgency,omitempty"`
	Status             *MeetStatusEnum       `json:"status,omitempty"`
	CancelReason       *MeetCancelReasonEnum `json:"cancelReason,omitempty"`
	CancelReasonCustom *string               `json:"cancelReasonCustom,omitempty"`
	UseDealDeposit     *bool                 `json:"useDealDeposit,omitempty"`
	LawerID            *string               `json:"lawerId,omitempty"`
	AccountantID       *string               `json:"accountantId,omitempty"`
	MortgageBrokerID   *string               `json:"mortgageBrokerId,omitempty"`
	UseMortgage        *bool                 `json:"useMortgage,omitempty"`
}

func (m *MeetInput) ToEntity() *sales_entity.Meet {
	return &sales_entity.Meet{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Type:               (*sales_entity.MeetType)(m.Type),
		DealType:           (*sales_entity.DealType)(m.DealType),
		ContactType:        (*sales_entity.CounterPartyType)(m.ContactType),
		DateTime:           m.DateTime,
		Property:           m.PropertyID,
		Address:            m.Address,
		Comment:            m.Comment,
		IsOnline:           m.IsOnline,
		SellerAgent:        m.SellerAgentID,
		SellerContact:      m.SellerContactID,
		SellerPhone:        m.SellerPhone,
		BuyerAgent:         m.BuyerAgentID,
		BuyerContact:       m.BuyerContactID,
		BuyerPhone:         m.BuyerPhone,
		BuyerAgency:        m.BuyerAgency,
		Status:             (*sales_entity.MeetStatus)(m.Status),
		CancelReason:       (*sales_entity.MeetCancelReason)(m.CancelReason),
		CancelReasonCustom: m.CancelReasonCustom,
		UseDealDeposit:     m.UseDealDeposit,
		Lawer:              m.LawerID,
		Accountant:         m.AccountantID,
		MortgageBroker:     m.MortgageBrokerID,
		UseMortgage:        m.UseMortgage,
	}
}

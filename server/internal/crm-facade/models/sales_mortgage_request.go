package crm_models

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type MortgageRequest struct {
	ID string `json:"id"`

	InternalNumber   *int                       `json:"internalNumber,omitempty"`
	Status           *MortgageRequestStatusEnum `json:"status,omitempty"`
	ContactID        *string                    `json:"-"`
	BankIDs          []string                   `json:"-"`
	MortgageBrokerID *string                    `json:"-"`
	AgentID          *string                    `json:"-"`
	DealID           *string                    `json:"-"`
	PropertyID       *string                    `json:"-"`
	Amount           *float64                   `json:"amount,omitempty"`
	FirstDeposit     *float64                   `json:"firstDeposit,omitempty"`
	Period           *int                       `json:"period,omitempty"`
	Comment          *string                    `json:"comment,omitempty"`
	ContractIDs      []string                   `json:"-"`
	DocumentIDs      []string                   `json:"-"`
	SendDate         time.Time                  `json:"sendDate,omitempty"`
	ResponseDate     time.Time                  `json:"responseDate,omitempty"`
	ValidTillDate    time.Time                  `json:"validTillDate,omitempty"`
	Percentage       *float64                   `json:"percentage,omitempty"`
	IsDeleted        *bool                      `json:"isDeleted,omitempty"`

	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (m *MortgageRequest) FromEntity(s *sales_entity.MortgageRequest) *MortgageRequest {

	return &MortgageRequest{
		ID:               s.ID,
		InternalNumber:   s.InternalNumber,
		Status:           (*MortgageRequestStatusEnum)(s.Status),
		ContactID:        s.Contact,
		BankIDs:          s.Banks,
		MortgageBrokerID: s.MortgageBroker,
		AgentID:          s.Agent,
		DealID:           s.Deal,
		PropertyID:       s.Property,
		Amount:           s.Amount,
		FirstDeposit:     s.FirstDeposit,
		Period:           s.Period,
		Comment:          s.Comment,
		ContractIDs:      s.Contracts,
		DocumentIDs:      s.Documents,
		SendDate:         s.SendDate,
		ResponseDate:     s.ResponseDate,
		ValidTillDate:    s.ValidTillDate,
		Percentage:       s.Percentage,
		IsDeleted:        s.IsDeleted,
		CreatedAt:        s.CreatedAt,
		UpdatedAt:        s.UpdatedAt,
	}
}

type MortgageRequestInput struct {
	ID               string                     `json:"id,omitempty"`
	Status           *MortgageRequestStatusEnum `json:"status,omitempty"`
	ContactID        *string                    `json:"contactId,omitempty"`
	BankIDs          []string                   `json:"bankIds,omitempty"`
	MortgageBrokerID *string                    `json:"mortgageBrokerId,omitempty"`
	AgentID          *string                    `json:"agentId,omitempty"`
	DealID           *string                    `json:"dealId,omitempty"`
	PropertyID       *string                    `json:"propertyId,omitempty"`
	Amount           *float64                   `json:"amount,omitempty"`
	FirstDeposit     *float64                   `json:"firstDeposit,omitempty"`
	Period           *int                       `json:"period,omitempty"`
	Comment          *string                    `json:"comment,omitempty"`
	ContractIDs      []string                   `json:"contractIds,omitempty"`
	DocumentIDs      []string                   `json:"documentIds,omitempty"`
	SendDate         time.Time                  `json:"sendDate,omitempty"`
	ResponseDate     time.Time                  `json:"responseDate,omitempty"`
	ValidTillDate    time.Time                  `json:"validTillDate,omitempty"`
	Percentage       *float64                   `json:"percentage,omitempty"`
}

func (m *MortgageRequestInput) ToEntity() *sales_entity.MortgageRequest {

	return &sales_entity.MortgageRequest{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Status:         (*sales_entity.MortgageRequestStatus)(m.Status),
		Contact:        m.ContactID,
		Banks:          m.BankIDs,
		MortgageBroker: m.MortgageBrokerID,
		Agent:          m.AgentID,
		Deal:           m.DealID,
		Property:       m.PropertyID,
		Amount:         m.Amount,
		FirstDeposit:   m.FirstDeposit,
		Period:         m.Period,
		Comment:        m.Comment,
		Contracts:      m.ContractIDs,
		Documents:      m.DocumentIDs,
		SendDate:       m.SendDate,
		ResponseDate:   m.ResponseDate,
		ValidTillDate:  m.ValidTillDate,
		Percentage:     m.Percentage,
	}
}

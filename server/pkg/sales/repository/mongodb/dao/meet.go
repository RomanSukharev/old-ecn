package sales_mongodb_dao

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MeetDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	InternalNumber     *int                           `bson:"internalNumber,omitempty"`
	Type               *sales_entity.MeetType         `bson:"type,omitempty"`
	ContactType        *sales_entity.CounterPartyType `bson:"contactType,omitempty"`
	DealType           *sales_entity.DealType         `bson:"dealType,omitempty"`
	DateTime           time.Time                      `bson:"dateTime,omitempty"`
	Property           *primitive.ObjectID            `bson:"property,omitempty"`
	Address            *string                        `bson:"address,omitempty"`
	Comment            *string                        `bson:"comment,omitempty"`
	IsOnline           *bool                          `bson:"isOnline,omitempty"`
	SellerAgent        *primitive.ObjectID            `bson:"sellerAgent,omitempty"`
	SellerContact      *primitive.ObjectID            `bson:"sellerContact,omitempty"`
	SellerPhone        *string                        `bson:"sellerPhone,omitempty"`
	BuyerAgent         *primitive.ObjectID            `bson:"buyerAgent,omitempty"`
	BuyerContact       *primitive.ObjectID            `bson:"buyerContact,omitempty"`
	BuyerPhone         *string                        `bson:"buyerPhone,omitempty"`
	BuyerAgency        *string                        `bson:"buyerAgency,omitempty"`
	Status             *sales_entity.MeetStatus       `bson:"status,omitempty"`
	CancelReason       *sales_entity.MeetCancelReason `bson:"cancelReason,omitempty"`
	CancelReasonCustom *string                        `bson:"cancelReasonCustom,omitempty"`
	UseDealDeposit     *bool                          `bson:"useDealDeposit,omitempty"`
	Lawer              *primitive.ObjectID            `bson:"lawer,omitempty"`
	Accountant         *primitive.ObjectID            `bson:"accountant,omitempty"`
	MortgageBroker     *primitive.ObjectID            `bson:"mortgageBroker,omitempty"`
	UseMortgage        *bool                          `bson:"useMortgage,omitempty"`
	IsDeleted          *bool                          `bson:"isDeleted,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *MeetDAO) FromEntity(entity sales_entity.Meet) *MeetDAO {
	*dao = MeetDAO{
		InternalNumber:     entity.InternalNumber,
		Type:               entity.Type,
		DealType:           entity.DealType,
		ContactType:        entity.ContactType,
		DateTime:           entity.DateTime,
		Address:            entity.Address,
		Comment:            entity.Comment,
		IsOnline:           entity.IsOnline,
		SellerPhone:        entity.SellerPhone,
		BuyerPhone:         entity.BuyerPhone,
		BuyerAgency:        entity.BuyerAgency,
		Status:             entity.Status,
		CancelReason:       entity.CancelReason,
		CancelReasonCustom: entity.CancelReasonCustom,
		UseDealDeposit:     entity.UseDealDeposit,
		UseMortgage:        entity.UseMortgage,
		IsDeleted:          entity.IsDeleted,
		CreatedAt:          entity.CreatedAt,
		UpdatedAt:          entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Property); err == nil {
		dao.Property = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.SellerAgent); err == nil {
		dao.SellerAgent = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.SellerContact); err == nil {
		dao.SellerContact = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.BuyerAgent); err == nil {
		dao.BuyerAgent = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.BuyerContact); err == nil {
		dao.BuyerContact = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Lawer); err == nil {
		dao.Lawer = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Accountant); err == nil {
		dao.Accountant = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.MortgageBroker); err == nil {
		dao.MortgageBroker = eid
	}

	return dao
}

func (dao *MeetDAO) ToEntity() *sales_entity.Meet {
	return &sales_entity.Meet{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		InternalNumber:     dao.InternalNumber,
		Type:               dao.Type,
		ContactType:        dao.ContactType,
		DealType:           dao.DealType,
		DateTime:           dao.DateTime,
		Property:           utils.StringFromObjectID(dao.Property),
		Address:            dao.Address,
		Comment:            dao.Comment,
		IsOnline:           dao.IsOnline,
		SellerAgent:        utils.StringFromObjectID(dao.SellerAgent),
		SellerContact:      utils.StringFromObjectID(dao.SellerContact),
		SellerPhone:        dao.SellerPhone,
		BuyerAgent:         utils.StringFromObjectID(dao.BuyerAgent),
		BuyerContact:       utils.StringFromObjectID(dao.BuyerContact),
		BuyerPhone:         dao.BuyerPhone,
		BuyerAgency:        dao.BuyerAgency,
		Status:             dao.Status,
		CancelReason:       dao.CancelReason,
		CancelReasonCustom: dao.CancelReasonCustom,
		UseDealDeposit:     dao.UseDealDeposit,
		Lawer:              utils.StringFromObjectID(dao.Lawer),
		Accountant:         utils.StringFromObjectID(dao.Accountant),
		MortgageBroker:     utils.StringFromObjectID(dao.MortgageBroker),
		UseMortgage:        dao.UseMortgage,
		IsDeleted:          dao.IsDeleted,
	}
}

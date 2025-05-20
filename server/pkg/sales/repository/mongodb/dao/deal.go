package sales_mongodb_dao

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DealDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	InternalNumber      *int                    `bson:"internalNumber,omitempty"`
	Type                *sales_entity.DealType  `bson:"type,omitempty"`
	Stage               *sales_entity.DealStage `bson:"stage,omitempty"`
	SellerAgent         *primitive.ObjectID     `bson:"sellerAgent,omitempty"`
	SellerContact       *primitive.ObjectID     `bson:"sellerContact,omitempty"`
	SellerPhone         *string                 `bson:"sellerPhone,omitempty"`
	SellerDocuments     []primitive.ObjectID    `bson:"sellerDocuments"`
	BuyerAgent          *primitive.ObjectID     `bson:"buyerAgent,omitempty"`
	BuyerContact        *primitive.ObjectID     `bson:"buyerContact,omitempty"`
	BuyerPhone          *string                 `bson:"buyerPhone,omitempty"`
	BuyerDocuments      []primitive.ObjectID    `bson:"buyerDocuments"`
	Property            *primitive.ObjectID     `bson:"property,omitempty"`
	Address             *string                 `bson:"address,omitempty"`
	MortgageBroker      *primitive.ObjectID     `bson:"mortgageBroker,omitempty"`
	MortgageRequest     *primitive.ObjectID     `bson:"mortgageRequest,omitempty"`
	MortgageDocuments   []primitive.ObjectID    `bson:"mortgageDocuments"`
	Lawer               *primitive.ObjectID     `bson:"lawer,omitempty"`
	LawerDocuments      []primitive.ObjectID    `bson:"lawerDocuments"`
	Accountant          *primitive.ObjectID     `bson:"accountant,omitempty"`
	AccountantDocuments []primitive.ObjectID    `bson:"accountantDocuments"`
	DepositDate         time.Time               `bson:"depositDate,omitempty"`
	DealDate            time.Time               `bson:"dealDate,omitempty"`
	FinishedAt          time.Time               `bson:"finishedAt,omitempty"`
	CommisionAmount     *float64                `bson:"commisionAmount,omitempty"`
	InternalComment     *string                 `bson:"internalComment,omitempty"`
	IsDeleted           *bool                   `bson:"isDeleted,omitempty"`
	CreatedAt           time.Time               `bson:"createdAt,omitempty"`
	UpdatedAt           time.Time               `bson:"updatedAt,omitempty"`
}

func (dao *DealDAO) FromEntity(entity sales_entity.Deal) *DealDAO {

	*dao = DealDAO{
		InternalNumber:  entity.InternalNumber,
		Type:            entity.Type,
		Stage:           entity.Stage,
		SellerPhone:     entity.SellerPhone,
		BuyerPhone:      entity.BuyerPhone,
		Address:         entity.Address,
		DepositDate:     entity.DepositDate,
		DealDate:        entity.DealDate,
		FinishedAt:      entity.FinishedAt,
		CommisionAmount: entity.CommisionAmount,
		InternalComment: entity.InternalComment,
		IsDeleted:       entity.IsDeleted,
		CreatedAt:       entity.CreatedAt,
		UpdatedAt:       entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.SellerAgent); err == nil {
		dao.SellerAgent = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.SellerContact); err == nil {
		dao.SellerContact = eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.SellerDocuments); err == nil {
		dao.SellerDocuments = eids
	}

	if eid, err := utils.ObjectIDFromString(entity.BuyerAgent); err == nil {
		dao.BuyerAgent = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.BuyerContact); err == nil {
		dao.BuyerContact = eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.BuyerDocuments); err == nil {
		dao.BuyerDocuments = eids
	}

	if eid, err := utils.ObjectIDFromString(entity.Property); err == nil {
		dao.Property = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Property); err == nil {
		dao.Property = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.MortgageBroker); err == nil {
		dao.MortgageBroker = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.MortgageRequest); err == nil {
		dao.MortgageRequest = eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.MortgageDocuments); err == nil {
		dao.MortgageDocuments = eids
	}

	if eid, err := utils.ObjectIDFromString(entity.Lawer); err == nil {
		dao.Lawer = eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.LawerDocuments); err == nil {
		dao.LawerDocuments = eids
	}

	if eid, err := utils.ObjectIDFromString(entity.Accountant); err == nil {
		dao.Accountant = eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.AccountantDocuments); err == nil {
		dao.AccountantDocuments = eids
	}

	return dao
}

func (dao *DealDAO) ToEntity() *sales_entity.Deal {
	return &sales_entity.Deal{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		InternalNumber:      dao.InternalNumber,
		Type:                dao.Type,
		Stage:               dao.Stage,
		SellerAgent:         utils.StringFromObjectID(dao.SellerAgent),
		SellerContact:       utils.StringFromObjectID(dao.SellerContact),
		SellerPhone:         dao.SellerPhone,
		SellerDocuments:     utils.StringsFromObjectIDs(dao.SellerDocuments),
		BuyerAgent:          utils.StringFromObjectID(dao.BuyerAgent),
		BuyerContact:        utils.StringFromObjectID(dao.BuyerContact),
		BuyerPhone:          dao.BuyerPhone,
		BuyerDocuments:      utils.StringsFromObjectIDs(dao.BuyerDocuments),
		Property:            utils.StringFromObjectID(dao.Property),
		Address:             dao.Address,
		MortgageBroker:      utils.StringFromObjectID(dao.MortgageBroker),
		MortgageRequest:     utils.StringFromObjectID(dao.MortgageRequest),
		MortgageDocuments:   utils.StringsFromObjectIDs(dao.MortgageDocuments),
		Lawer:               utils.StringFromObjectID(dao.Lawer),
		LawerDocuments:      utils.StringsFromObjectIDs(dao.LawerDocuments),
		Accountant:          utils.StringFromObjectID(dao.Accountant),
		AccountantDocuments: utils.StringsFromObjectIDs(dao.AccountantDocuments),
		DepositDate:         dao.DepositDate,
		DealDate:            dao.DealDate,
		FinishedAt:          dao.FinishedAt,
		CommisionAmount:     dao.CommisionAmount,
		InternalComment:     dao.InternalComment,
		IsDeleted:           dao.IsDeleted,
	}
}

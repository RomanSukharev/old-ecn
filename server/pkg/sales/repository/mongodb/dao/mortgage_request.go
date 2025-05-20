package sales_mongodb_dao

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type MortgageRequestDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	InternalNumber *int                                `bson:"internalNumber,omitempty"`
	Status         *sales_entity.MortgageRequestStatus `bson:"status,omitempty"`
	Contact        *primitive.ObjectID                 `bson:"contact,omitempty"`
	Banks          []primitive.ObjectID                `bson:"banks"`
	MortgageBroker *primitive.ObjectID                 `bson:"mortgageBroker,omitempty"`
	Agent          *primitive.ObjectID                 `bson:"agent,omitempty"`
	Deal           *primitive.ObjectID                 `bson:"deal,omitempty"`
	Property       *primitive.ObjectID                 `bson:"property,omitempty"`
	Amount         *float64                            `bson:"amount,omitempty"`
	FirstDeposit   *float64                            `bson:"firstDeposit,omitempty"`
	Period         *int                                `bson:"period,omitempty"`
	Comment        *string                             `bson:"comment,omitempty"`
	Contracts      []primitive.ObjectID                `bson:"contracts"`
	Documents      []primitive.ObjectID                `bson:"documents"`
	SendDate       time.Time                           `bson:"sendDate,omitempty"`
	ResponseDate   time.Time                           `bson:"responseDate,omitempty"`
	ValidTillDate  time.Time                           `bson:"validTillDate,omitempty"`
	Percentage     *float64                            `bson:"percentage,omitempty"`
	IsDeleted      *bool                               `bson:"isDeleted,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *MortgageRequestDAO) FromEntity(entity sales_entity.MortgageRequest) *MortgageRequestDAO {

	*dao = MortgageRequestDAO{
		InternalNumber: entity.InternalNumber,
		Status:         entity.Status,
		Amount:         entity.Amount,
		FirstDeposit:   entity.FirstDeposit,
		Period:         entity.Period,
		Comment:        entity.Comment,
		SendDate:       entity.SendDate,
		ResponseDate:   entity.ResponseDate,
		ValidTillDate:  entity.ValidTillDate,
		Percentage:     entity.Percentage,
		IsDeleted:      entity.IsDeleted,
		CreatedAt:      entity.CreatedAt,
		UpdatedAt:      entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Contact); err == nil {
		dao.Contact = eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.Banks); err == nil {
		dao.Banks = eids
	}

	if eid, err := utils.ObjectIDFromString(entity.MortgageBroker); err == nil {
		dao.MortgageBroker = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Agent); err == nil {
		dao.Agent = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Deal); err == nil {
		dao.Deal = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.Property); err == nil {
		dao.Property = eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.Contracts); err == nil {
		dao.Contracts = eids
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.Documents); err == nil {
		dao.Documents = eids
	}

	return dao
}

func (dao *MortgageRequestDAO) ToEntity() *sales_entity.MortgageRequest {

	return &sales_entity.MortgageRequest{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		InternalNumber: dao.InternalNumber,
		Status:         dao.Status,
		Contact:        utils.StringFromObjectID(dao.Contact),
		Banks:          utils.StringsFromObjectIDs(dao.Banks),
		MortgageBroker: utils.StringFromObjectID(dao.MortgageBroker),
		Agent:          utils.StringFromObjectID(dao.Agent),
		Deal:           utils.StringFromObjectID(dao.Deal),
		Property:       utils.StringFromObjectID(dao.Property),
		Amount:         dao.Amount,
		FirstDeposit:   dao.FirstDeposit,
		Period:         dao.Period,
		Comment:        dao.Comment,
		Contracts:      utils.StringsFromObjectIDs(dao.Contracts),
		Documents:      utils.StringsFromObjectIDs(dao.Documents),
		SendDate:       dao.SendDate,
		ResponseDate:   dao.ResponseDate,
		ValidTillDate:  dao.ValidTillDate,
		Percentage:     dao.Percentage,
		IsDeleted:      dao.IsDeleted,
	}
}

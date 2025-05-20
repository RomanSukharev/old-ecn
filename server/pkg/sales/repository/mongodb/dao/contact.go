package sales_mongodb_dao

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type ContactDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	InternalNumber     *int                           `bson:"internalNumber,omitempty"`
	Type               *sales_entity.CounterPartyType `bson:"type,omitempty"`
	Source             *sales_entity.ContactSource    `bson:"source,omitempty"`
	Name               *string                        `bson:"name,omitempty"`
	Surname            *string                        `bson:"surname,omitempty"`
	Patronymic         *string                        `bson:"patronymic,omitempty"`
	Birthday           time.Time                      `bson:"birthday,omitempty"`
	Phone              *string                        `bson:"phone,omitempty"`
	AdditionalPhones   []string                       `bson:"additionalPhones"`
	Email              *string                        `bson:"email,omitemtpy"`
	Company            *string                        `bson:"company,omitempty"`
	Address            *string                        `bson:"address,omitempty"`
	PropertyIDs        []primitive.ObjectID           `bson:"properties,omitempty"`
	PassportNumber     *string                        `bson:"passportNumber,omitempty"`
	PassportIssuedBy   *string                        `bson:"passportIssuedBy,omitempty"`
	PassportIssueDate  time.Time                      `bson:"passportIssueDate,omitempty"`
	PassportIssuerCode *string                        `bson:"passportIssuerCode,omitempty"`
	InternalInfo       *string                        `bson:"internalInfo,omitempty"`
	Note               *string                        `bson:"note,omitempty"`
	AgentIDs           []primitive.ObjectID           `bson:"agents"`
	DealIDs            []primitive.ObjectID           `bson:"deals"`
	ContractIDs        []primitive.ObjectID           `bson:"contracts"`
	DocumentIDs        []primitive.ObjectID           `bson:"documents"`
	LeadID             *primitive.ObjectID            `bson:"lead,omitempty"`
	IsDeleted          *bool                          `bson:"isDeleted,omitempty"`
	CreatedAt          time.Time                      `bson:"createdAt,omitempty"`
	UpdatedAt          time.Time                      `bson:"updatedAt,omitempty"`
}

func (dao *ContactDAO) FromEntity(entity sales_entity.Contact) *ContactDAO {

	*dao = ContactDAO{
		InternalNumber:     entity.InternalNumber,
		Type:               entity.Type,
		Source:             entity.Source,
		Name:               entity.Name,
		Surname:            entity.Surname,
		Patronymic:         entity.Patronymic,
		Birthday:           entity.Birthday,
		Phone:              entity.Phone,
		AdditionalPhones:   entity.AdditionalPhones,
		Email:              entity.Email,
		Company:            entity.Company,
		Address:            entity.Address,
		PassportNumber:     entity.PassportNumber,
		PassportIssuedBy:   entity.PassportIssusedBy,
		PassportIssueDate:  entity.PassportIssueDate,
		PassportIssuerCode: entity.PassportIssuerCode,
		InternalInfo:       entity.InternalInfo,
		Note:               entity.Note,
		IsDeleted:          entity.IsDeleted,
		CreatedAt:          entity.CreatedAt,
		UpdatedAt:          entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.AgentIDs); err == nil {
		dao.AgentIDs = eids
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.PropertyIDs); err == nil {
		dao.PropertyIDs = eids
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.DealIDs); err == nil {
		dao.DealIDs = eids
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.ContractIDs); err == nil {
		dao.ContractIDs = eids
	}

	if eids, err := utils.ObjectIDsFromStrings(entity.DocumentIDs); err == nil {
		dao.DocumentIDs = eids
	}

	if eid, err := utils.ObjectIDFromString(entity.LeadID); err == nil {
		dao.LeadID = eid
	}

	return dao
}

func (dao *ContactDAO) ToEntity() *sales_entity.Contact {

	return &sales_entity.Contact{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		InternalNumber:     dao.InternalNumber,
		Type:               dao.Type,
		Source:             dao.Source,
		Name:               dao.Name,
		Surname:            dao.Surname,
		Patronymic:         dao.Patronymic,
		Birthday:           dao.Birthday,
		Phone:              dao.Phone,
		AdditionalPhones:   dao.AdditionalPhones,
		Email:              dao.Email,
		Company:            dao.Company,
		Address:            dao.Address,
		PropertyIDs:        utils.StringsFromObjectIDs(dao.PropertyIDs),
		PassportNumber:     dao.PassportNumber,
		PassportIssusedBy:  dao.PassportIssuedBy,
		PassportIssueDate:  dao.PassportIssueDate,
		PassportIssuerCode: dao.PassportIssuerCode,
		InternalInfo:       dao.InternalInfo,
		Note:               dao.Note,
		AgentIDs:           utils.StringsFromObjectIDs(dao.AgentIDs),
		DealIDs:            utils.StringsFromObjectIDs(dao.DealIDs),
		ContractIDs:        utils.StringsFromObjectIDs(dao.ContractIDs),
		DocumentIDs:        utils.StringsFromObjectIDs(dao.DocumentIDs),
		LeadID:             utils.StringFromObjectID(dao.LeadID),
		IsDeleted:          dao.IsDeleted,
	}
}

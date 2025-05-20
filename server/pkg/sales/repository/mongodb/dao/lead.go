package sales_mongodb_dao

import (
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LeadDAO struct {
	ID primitive.ObjectID `bson:"_id,omitempty"`

	InternalNumber   *int                     `bson:"internalNumber,omitempty"`
	Type             *sales_entity.LeadType   `bson:"type,omitempty"`
	Source           *sales_entity.LeadSource `bson:"source,omitempty"`
	Name             *string                  `bson:"name,omitempty"`
	Surname          *string                  `bson:"surname,omitempty"`
	Patronymic       *string                  `bson:"patronymic,omitempty"`
	Birthday         *time.Time               `bson:"birthday,omitempty"`
	Phone            *string                  `bson:"phone,omitempty"`
	AdditionalPhones []string                 `bson:"additionalPhones"`
	Email            *string                  `bson:"email,omitempty"`
	Company          *string                  `bson:"company,omitempty"`
	Address          *string                  `bson:"address,omitempty"`
	Request          *string                  `bson:"request,omitempty"`
	AgentsIDs        []primitive.ObjectID     `bson:"agents"`
	Status           *sales_entity.LeadStatus `bson:"status,omitempty"`
	Comment          *string                  `bson:"comment,omitempty"`
	IsDeleted        *bool                    `bson:"isDeleted,omitempty"`

	CreatedAt time.Time `bson:"createdAt,omitempty"`
	UpdatedAt time.Time `bson:"updatedAt,omitempty"`
}

func (dao *LeadDAO) FromEntity(entity sales_entity.Lead) *LeadDAO {

	*dao = LeadDAO{
		InternalNumber:   entity.InternalNumber,
		Type:             entity.Type,
		Source:           entity.Source,
		Name:             entity.Name,
		Surname:          entity.Surname,
		Patronymic:       entity.Patronymic,
		Birthday:         entity.Birthday,
		Phone:            entity.Phone,
		AdditionalPhones: entity.AdditionalPhones,
		Email:            entity.Email,
		Company:          entity.Company,
		Address:          entity.Address,
		Request:          entity.Request,
		Status:           entity.Status,
		Comment:          entity.Comment,
		IsDeleted:        entity.IsDeleted,
		CreatedAt:        entity.CreatedAt,
		UpdatedAt:        entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDsFromStrings(entity.AgentIDs); err == nil {
		dao.AgentsIDs = eid
	}

	return dao
}

func (dao *LeadDAO) ToEntity() *sales_entity.Lead {

	return &sales_entity.Lead{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		InternalNumber:   dao.InternalNumber,
		Type:             dao.Type,
		Source:           dao.Source,
		Name:             dao.Name,
		Surname:          dao.Surname,
		Patronymic:       dao.Patronymic,
		Birthday:         dao.Birthday,
		Phone:            dao.Phone,
		AdditionalPhones: dao.AdditionalPhones,
		Email:            dao.Email,
		Company:          dao.Company,
		Address:          dao.Address,
		Request:          dao.Request,
		AgentIDs:         utils.StringsFromObjectIDs(dao.AgentsIDs),
		Status:           dao.Status,
		Comment:          dao.Comment,
		IsDeleted:        dao.IsDeleted,
	}
}

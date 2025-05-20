package sales_mongodb_dao

import (
	"testing"
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var (
	testContactID                   = "64128c014984c7696d66795e"
	testContactPrimitiveID          = primitive.NewObjectID()
	testContactCreatedAt            = time.Now()
	testContactUpdatedAt            = time.Now()
	testContactInternalNumber       = 1
	testContactType                 = sales_entity.CounterPartyTypeSaler
	tesctContactSource              = sales_entity.ContactSourceUnset
	testContactName                 = "Ivan"
	testContactSurname              = "Ivanov"
	testContactPatronymic           = "Ivanovich"
	testContactBirthday             = time.Now()
	testContactPhone                = "89999999999"
	testContactAddtionalPhones      = []string{"88888888888", "87777777777"}
	testContactEmail                = "ivanpink@mail.ru"
	testContactCompany              = "Pink"
	testContactPassportNumber       = "7116 267292"
	testContactPassportIssuedBy     = "UFMS TYUMEN OBLAST"
	testContactPassportIssueDate    = time.Now()
	testContactPassportIssuerCode   = "720-020"
	testContactNote                 = "Some note"
	testContactAgentIDs             = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testContactContractIDs          = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testContactDocumentIDs          = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testContactPrimitiveAgentIDs    = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testContactPrimitiveContractIDs = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testContactPrimitiveDocumentIDs = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testContactIsDeleted            = false
)

func TestContactDAO_FromEntity(t *testing.T) {

	t.Run("EmptyContact", func(t *testing.T) {

		entity := sales_entity.Contact{}
		dao := ContactDAO{}
		result := dao.FromEntity(entity)

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())
		assert.True(t, result.Birthday.IsZero())
		assert.True(t, result.PassportIssueDate.IsZero())

		assert.Equal(t, result.ID, primitive.NilObjectID)

		assert.Empty(t, result.AdditionalPhones)
		assert.Empty(t, result.AgentIDs)
		assert.Empty(t, result.ContractIDs)
		assert.Empty(t, result.DocumentIDs)

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Source)
		assert.Nil(t, result.Name)
		assert.Nil(t, result.Surname)
		assert.Nil(t, result.Patronymic)
		assert.Nil(t, result.Phone)
		assert.Nil(t, result.Email)
		assert.Nil(t, result.Company)
		assert.Nil(t, result.PassportNumber)
		assert.Nil(t, result.PassportIssuedBy)
		assert.Nil(t, result.PassportIssuerCode)
		assert.Nil(t, result.Note)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledContact", func(t *testing.T) {

		entity := sales_entity.Contact{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testContactID,
				CreatedAt: testContactCreatedAt,
				UpdatedAt: testContactUpdatedAt,
			},
			InternalNumber:     &testContactInternalNumber,
			Type:               &testContactType,
			Source:             &tesctContactSource,
			Name:               &testContactName,
			Surname:            &testContactSurname,
			Patronymic:         &testContactPatronymic,
			Birthday:           testContactBirthday,
			Phone:              &testContactPhone,
			AdditionalPhones:   testContactAddtionalPhones,
			Email:              &testContactEmail,
			Company:            &testContactCompany,
			PassportNumber:     &testContactPassportNumber,
			PassportIssusedBy:  &testContactPassportIssuedBy,
			PassportIssueDate:  testContactPassportIssueDate,
			PassportIssuerCode: &testContactPassportIssuerCode,
			Note:               &testContactNote,
			AgentIDs:           testContactAgentIDs,
			ContractIDs:        testContactContractIDs,
			DocumentIDs:        testContactDocumentIDs,
			IsDeleted:          &testContactIsDeleted,
		}

		dao := ContactDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.Birthday.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())
		assert.False(t, result.PassportIssueDate.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Type)
		assert.NotNil(t, result.Source)
		assert.NotNil(t, result.Name)
		assert.NotNil(t, result.Surname)
		assert.NotNil(t, result.Patronymic)
		assert.NotNil(t, result.Phone)
		assert.NotNil(t, result.AdditionalPhones)
		assert.NotNil(t, result.Email)
		assert.NotNil(t, result.Company)
		assert.NotNil(t, result.PassportNumber)
		assert.NotNil(t, result.PassportIssuedBy)
		assert.NotNil(t, result.PassportIssuerCode)
		assert.NotNil(t, result.Note)
		assert.NotNil(t, result.AgentIDs)
		assert.NotNil(t, result.ContractIDs)
		assert.NotNil(t, result.DocumentIDs)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID.Hex(), testContactID)
		assert.Equal(t, *result.InternalNumber, testContactInternalNumber)
		assert.Equal(t, *result.Type, testContactType)
		assert.Equal(t, *result.Source, tesctContactSource)
		assert.Equal(t, *result.Name, testContactName)
		assert.Equal(t, *result.Surname, testContactSurname)
		assert.Equal(t, *result.Patronymic, testContactPatronymic)
		assert.Equal(t, result.Birthday, testContactBirthday)
		assert.Equal(t, *result.Phone, testContactPhone)
		assert.Equal(t, result.AdditionalPhones, testContactAddtionalPhones)
		assert.Equal(t, *result.Email, testContactEmail)
		assert.Equal(t, *result.Company, testContactCompany)
		assert.Equal(t, *result.PassportNumber, testContactPassportNumber)
		assert.Equal(t, *result.PassportIssuedBy, testContactPassportIssuedBy)
		assert.Equal(t, result.PassportIssueDate, testContactPassportIssueDate)
		assert.Equal(t, *result.PassportIssuerCode, testContactPassportIssuerCode)
		assert.Equal(t, *result.Note, testContactNote)
		assert.Equal(t, utils.StringsFromObjectIDs(result.AgentIDs), testContactAgentIDs)
		assert.Equal(t, utils.StringsFromObjectIDs(result.ContractIDs), testContactContractIDs)
		assert.Equal(t, utils.StringsFromObjectIDs(result.DocumentIDs), testContactDocumentIDs)
		assert.Equal(t, *result.IsDeleted, testContactIsDeleted)
		assert.Equal(t, result.CreatedAt, testContactCreatedAt)
		assert.Equal(t, result.UpdatedAt, testContactUpdatedAt)
	})
}

func TestContactDAO_ToEntity(t *testing.T) {

	t.Run("EmptyContact", func(t *testing.T) {
		dao := &ContactDAO{
			ID: primitive.NewObjectID(),
		}

		result := dao.ToEntity()

		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())
		assert.True(t, result.Birthday.IsZero())
		assert.True(t, result.PassportIssueDate.IsZero())

		assert.Equal(t, result.ID, dao.ID.Hex())

		assert.Empty(t, result.AdditionalPhones)
		assert.Empty(t, result.AgentIDs)
		assert.Empty(t, result.ContractIDs)
		assert.Empty(t, result.DocumentIDs)

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Source)
		assert.Nil(t, result.Name)
		assert.Nil(t, result.Surname)
		assert.Nil(t, result.Patronymic)
		assert.Nil(t, result.Phone)
		assert.Nil(t, result.Email)
		assert.Nil(t, result.Company)
		assert.Nil(t, result.PassportNumber)
		assert.Nil(t, result.PassportIssusedBy)
		assert.Nil(t, result.PassportIssuerCode)
		assert.Nil(t, result.Note)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledContact", func(t *testing.T) {

		dao := &ContactDAO{
			ID:                 testContactPrimitiveID,
			InternalNumber:     &testContactInternalNumber,
			Type:               &testContactType,
			Source:             &tesctContactSource,
			Name:               &testContactName,
			Surname:            &testContactSurname,
			Patronymic:         &testContactPatronymic,
			Birthday:           testContactBirthday,
			Phone:              &testContactPhone,
			AdditionalPhones:   testContactAddtionalPhones,
			Email:              &testContactEmail,
			Company:            &testContactCompany,
			PassportNumber:     &testContactPassportNumber,
			PassportIssuedBy:   &testContactPassportIssuedBy,
			PassportIssueDate:  testContactPassportIssueDate,
			PassportIssuerCode: &testContactPassportIssuerCode,
			Note:               &testContactNote,
			AgentIDs:           testContactPrimitiveAgentIDs,
			ContractIDs:        testContactPrimitiveContractIDs,
			DocumentIDs:        testContactPrimitiveDocumentIDs,
			IsDeleted:          &testContactIsDeleted,
			CreatedAt:          testContactCreatedAt,
			UpdatedAt:          testContactUpdatedAt,
		}

		result := dao.ToEntity()

		assert.False(t, result.Birthday.IsZero())
		assert.False(t, result.PassportIssueDate.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Type)
		assert.NotNil(t, result.Source)
		assert.NotNil(t, result.Name)
		assert.NotNil(t, result.Surname)
		assert.NotNil(t, result.Patronymic)
		assert.NotNil(t, result.Phone)
		assert.NotNil(t, result.AdditionalPhones)
		assert.NotNil(t, result.Email)
		assert.NotNil(t, result.Company)
		assert.NotNil(t, result.PassportNumber)
		assert.NotNil(t, result.PassportIssusedBy)
		assert.NotNil(t, result.PassportIssuerCode)
		assert.NotNil(t, result.Note)
		assert.NotNil(t, result.AgentIDs)
		assert.NotNil(t, result.ContractIDs)
		assert.NotNil(t, result.DocumentIDs)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID, testContactPrimitiveID.Hex())
		assert.Equal(t, *result.InternalNumber, testContactInternalNumber)
		assert.Equal(t, *result.Type, testContactType)
		assert.Equal(t, *result.Source, tesctContactSource)
		assert.Equal(t, *result.Name, testContactName)
		assert.Equal(t, *result.Surname, testContactSurname)
		assert.Equal(t, *result.Patronymic, testContactPatronymic)
		assert.Equal(t, result.Birthday, testContactBirthday)
		assert.Equal(t, *result.Phone, testContactPhone)
		assert.Equal(t, result.AdditionalPhones, testContactAddtionalPhones)
		assert.Equal(t, *result.Email, testContactEmail)
		assert.Equal(t, *result.Company, testContactCompany)
		assert.Equal(t, *result.PassportNumber, testContactPassportNumber)
		assert.Equal(t, *result.PassportIssusedBy, testContactPassportIssuedBy)
		assert.Equal(t, result.PassportIssueDate, testContactPassportIssueDate)
		assert.Equal(t, *result.PassportIssuerCode, testContactPassportIssuerCode)
		assert.Equal(t, *result.Note, testContactNote)
		assert.Equal(t, result.AgentIDs, utils.StringsFromObjectIDs(testContactPrimitiveAgentIDs))
		assert.Equal(t, result.ContractIDs, utils.StringsFromObjectIDs(testContactPrimitiveContractIDs))
		assert.Equal(t, result.DocumentIDs, utils.StringsFromObjectIDs(testContactPrimitiveDocumentIDs))
		assert.Equal(t, *result.IsDeleted, testContactIsDeleted)
		assert.Equal(t, result.CreatedAt, testContactCreatedAt)
		assert.Equal(t, result.UpdatedAt, testContactUpdatedAt)
	})
}

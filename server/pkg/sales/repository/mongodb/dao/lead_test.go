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
	testLeadID                = "64128c014984c7696d66795e"
	testPrimitiveLeadID       = primitive.NewObjectID()
	testCreatedAtLead         = time.Now()
	testUpdatedAtLead         = time.Now()
	testInternalNumberLead    = 1
	testLeadType              = sales_entity.LeadTypeSaler
	testLeadSource            = sales_entity.LeadSourceUnset
	testNameLead              = "Ivan"
	testSurnameLead           = "Ivanov"
	testPatronymicLead        = "Ivanovich"
	testBirthdayLead          = time.Now()
	testPhoneLead             = "89999999999"
	testAddtionalPhonesLead   = []string{"88888888888", "87777777777"}
	testEmailLead             = "ivanpink@mail.ru"
	testCompanyLead           = "Pink"
	testAddressLead           = "Green Street"
	testRequestLead           = "Need brand"
	testAgentIDsLead          = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testPrimitiveAgentIDsLead = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testStatusLead            = sales_entity.LeadStatusSuccess
	testCommentLead           = "Some comment"
	testIsDeletedLead         = false
)

func TestLeadDAO_FromEntity(t *testing.T) {

	t.Run("EmptyLead", func(t *testing.T) {

		entity := sales_entity.Lead{}
		dao := LeadDAO{}
		result := dao.FromEntity(entity)

		assert.Equal(t, result.ID, primitive.NilObjectID)

		assert.Zero(t, result.Birthday)
		assert.Zero(t, result.CreatedAt)
		assert.Zero(t, result.UpdatedAt)

		assert.Empty(t, result.AdditionalPhones)
		assert.Empty(t, result.AgentsIDs)

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Source)
		assert.Nil(t, result.Name)
		assert.Nil(t, result.Surname)
		assert.Nil(t, result.Patronymic)
		assert.Nil(t, result.Phone)
		assert.Nil(t, result.Email)
		assert.Nil(t, result.Company)
		assert.Nil(t, result.Address)
		assert.Nil(t, result.Request)
		assert.Nil(t, result.Status)
		assert.Nil(t, result.Comment)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledLead", func(t *testing.T) {

		entity := sales_entity.Lead{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testLeadID,
				CreatedAt: testCreatedAtLead,
				UpdatedAt: testUpdatedAtLead,
			},
			InternalNumber:   &testInternalNumberLead,
			Type:             &testLeadType,
			Source:           &testLeadSource,
			Name:             &testNameLead,
			Surname:          &testSurnameLead,
			Patronymic:       &testPatronymicLead,
			Birthday:         &testBirthdayLead,
			Phone:            &testPhoneLead,
			AdditionalPhones: testAddtionalPhonesLead,
			Email:            &testEmailLead,
			Company:          &testCompanyLead,
			Address:          &testAddressLead,
			Request:          &testRequestLead,
			AgentIDs:         testAgentIDsLead,
			Status:           &testStatusLead,
			Comment:          &testCommentLead,
			IsDeleted:        &testIsDeletedLead,
		}

		dao := LeadDAO{}
		result := dao.FromEntity(entity)

		assert.NotZero(t, result.Birthday)
		assert.NotZero(t, result.CreatedAt)
		assert.NotZero(t, result.UpdatedAt)

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
		assert.NotNil(t, result.Address)
		assert.NotNil(t, result.Request)
		assert.NotNil(t, result.AgentsIDs)
		assert.NotNil(t, result.Status)
		assert.NotNil(t, result.Comment)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID.Hex(), testLeadID)
		assert.Equal(t, *result.InternalNumber, testInternalNumberLead)
		assert.Equal(t, *result.Type, testLeadType)
		assert.Equal(t, *result.Source, testLeadSource)
		assert.Equal(t, *result.Name, testNameLead)
		assert.Equal(t, *result.Surname, testSurnameLead)
		assert.Equal(t, *result.Patronymic, testPatronymicLead)
		assert.Equal(t, *result.Birthday, testBirthdayLead)
		assert.Equal(t, *result.Phone, testPhoneLead)
		assert.Equal(t, result.AdditionalPhones, testAddtionalPhonesLead)
		assert.Equal(t, *result.Email, testEmailLead)
		assert.Equal(t, *result.Company, testCompanyLead)
		assert.Equal(t, *result.Address, testAddressLead)
		assert.Equal(t, *result.Request, testRequestLead)
		assert.Equal(t, utils.StringsFromObjectIDs(result.AgentsIDs), testAgentIDsLead)
		assert.Equal(t, *result.Status, testStatusLead)
		assert.Equal(t, *result.Comment, testCommentLead)
		assert.Equal(t, *result.IsDeleted, testIsDeletedLead)
		assert.Equal(t, result.CreatedAt, testCreatedAtLead)
		assert.Equal(t, result.UpdatedAt, testUpdatedAtLead)
	})
}

func TestLeadDAO_ToEntity(t *testing.T) {

	t.Run("EmptyLead", func(t *testing.T) {
		dao := &LeadDAO{
			ID: primitive.NewObjectID(),
		}
		result := dao.ToEntity()

		assert.Zero(t, result.CreatedAt)
		assert.Zero(t, result.UpdatedAt)
		assert.Zero(t, result.Birthday)

		assert.Equal(t, result.ID, dao.ID.Hex())

		assert.Empty(t, result.AdditionalPhones)
		assert.Empty(t, result.AgentIDs)

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Source)
		assert.Nil(t, result.Name)
		assert.Nil(t, result.Surname)
		assert.Nil(t, result.Patronymic)
		assert.Nil(t, result.Phone)
		assert.Nil(t, result.Email)
		assert.Nil(t, result.Company)
		assert.Nil(t, result.Address)
		assert.Nil(t, result.Request)
		assert.Nil(t, result.Status)
		assert.Nil(t, result.Comment)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledLead", func(t *testing.T) {

		dao := &LeadDAO{
			ID:               testPrimitiveLeadID,
			InternalNumber:   &testInternalNumberLead,
			Type:             &testLeadType,
			Source:           &testLeadSource,
			Name:             &testNameLead,
			Surname:          &testSurnameLead,
			Patronymic:       &testPatronymicLead,
			Birthday:         &testBirthdayLead,
			Phone:            &testPhoneLead,
			AdditionalPhones: testAddtionalPhonesLead,
			Email:            &testEmailLead,
			Company:          &testCompanyLead,
			Address:          &testAddressLead,
			Request:          &testRequestLead,
			AgentsIDs:        testPrimitiveAgentIDsLead,
			Status:           &testStatusLead,
			Comment:          &testCommentLead,
			IsDeleted:        &testIsDeletedLead,
			CreatedAt:        testCreatedAtLead,
			UpdatedAt:        testUpdatedAtLead,
		}

		result := dao.ToEntity()

		assert.NotZero(t, result.CreatedAt)
		assert.NotZero(t, result.UpdatedAt)
		assert.NotZero(t, result.Birthday)

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
		assert.NotNil(t, result.Address)
		assert.NotNil(t, result.Request)
		assert.NotNil(t, result.AgentIDs)
		assert.NotNil(t, result.Comment)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID, testPrimitiveLeadID.Hex())
		assert.Equal(t, *result.InternalNumber, testInternalNumberLead)
		assert.Equal(t, *result.Type, testLeadType)
		assert.Equal(t, *result.Source, testLeadSource)
		assert.Equal(t, *result.Name, testNameLead)
		assert.Equal(t, *result.Surname, testSurnameLead)
		assert.Equal(t, *result.Patronymic, testPatronymicLead)
		assert.Equal(t, *result.Birthday, testBirthdayLead)
		assert.Equal(t, *result.Phone, testPhoneLead)
		assert.Equal(t, result.AdditionalPhones, testAddtionalPhonesLead)
		assert.Equal(t, *result.Email, testEmailLead)
		assert.Equal(t, *result.Company, testCompanyLead)
		assert.Equal(t, *result.Address, testAddressLead)
		assert.Equal(t, *result.Request, testRequestLead)
		assert.Equal(t, result.AgentIDs, utils.StringsFromObjectIDs(testPrimitiveAgentIDsLead))
		assert.Equal(t, *result.Status, testStatusLead)
		assert.Equal(t, *result.Comment, testCommentLead)
		assert.Equal(t, *result.IsDeleted, testIsDeletedLead)
		assert.Equal(t, result.CreatedAt, testCreatedAtLead)
		assert.Equal(t, result.UpdatedAt, testUpdatedAtLead)
	})
}

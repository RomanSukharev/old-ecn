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
	testMortgageRequestID                        = "64128c014984c7696d66795e"
	testMortgageRequestPrimitiveID               = primitive.NewObjectID()
	testMortgageRequestCreatedAt                 = time.Now()
	testMortgageRequestUpdatedAt                 = time.Now()
	testMortgageRequestInternalNumber            = 1
	testMortgageRequestStatus                    = sales_entity.MortgageRequestStatusApproved
	testMortgageRequestContactID                 = "64128c014984c7696d66795e"
	testMortgageRequestPrimitiveContactID        = primitive.NewObjectID()
	testMortgageRequestBanksIDs                  = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testMortgageRequestPrimitiveBankIDs          = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testMortgageRequestMortgageBrokerID          = "64128c014984c7696d66795e"
	testMortgageRequestPrimitiveMortgageBrokerID = primitive.NewObjectID()
	testMortgageRequestAgentID                   = "64128c014984c7696d66795e"
	testMortgageRequestPrimitiveAgentID          = primitive.NewObjectID()
	testMortgageRequestDealID                    = "64128c014984c7696d66795e"
	testMortgageRequestPrimitiveDealID           = primitive.NewObjectID()
	testMortgageRequestPropertyID                = "64128c014984c7696d66795e"
	testMortgageRequestPrimitivePropertyID       = primitive.NewObjectID()
	testMortgageRequestAmount                    = 1.0
	testMortgageRequestFirstDeposit              = 1.0
	testMortgageRequestPeriod                    = 1
	testMortgageRequestComment                   = "Some comment"
	testMortgageRequestContractIDs               = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testMortgageRequestPrimitiveContractIDs      = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testMortgageRequestDocumentIDs               = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testMortgageRequestPrimitiveDocumentIDs      = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testMortgageRequestSendDate                  = time.Now()
	testMortgageRequestResponseDate              = time.Now()
	testMortgageRequestValidTillDate             = time.Now()
	testMortgageRequestPercentage                = 1.0
	testMortgageRequestIsDeleted                 = false
)

func TestMortgageRequestDAO_FromEntity(t *testing.T) {

	t.Run("EmtpyMortgageRequest", func(t *testing.T) {
		entity := sales_entity.MortgageRequest{}
		dao := MortgageRequestDAO{}
		result := dao.FromEntity(entity)

		assert.Equal(t, result.ID, primitive.NilObjectID)

		assert.True(t, result.SendDate.IsZero())
		assert.True(t, result.ResponseDate.IsZero())
		assert.True(t, result.ValidTillDate.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Empty(t, result.Banks)
		assert.Empty(t, result.Contracts)
		assert.Empty(t, result.Documents)

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Status)
		assert.Nil(t, result.Contact)
		assert.Nil(t, result.MortgageBroker)
		assert.Nil(t, result.Agent)
		assert.Nil(t, result.Deal)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Amount)
		assert.Nil(t, result.FirstDeposit)
		assert.Nil(t, result.Period)
		assert.Nil(t, result.Comment)
		assert.Nil(t, result.Percentage)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledMortgageRequest", func(t *testing.T) {

		entity := sales_entity.MortgageRequest{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testMortgageRequestID,
				CreatedAt: testMortgageRequestCreatedAt,
				UpdatedAt: testMortgageRequestUpdatedAt,
			},
			InternalNumber: &testMortgageRequestInternalNumber,
			Status:         &testMortgageRequestStatus,
			Contact:        &testMortgageRequestContactID,
			Banks:          testMortgageRequestBanksIDs,
			MortgageBroker: &testMortgageRequestMortgageBrokerID,
			Agent:          &testMortgageRequestAgentID,
			Deal:           &testMortgageRequestDealID,
			Property:       &testMortgageRequestPropertyID,
			Amount:         &testMortgageRequestAmount,
			FirstDeposit:   &testMortgageRequestFirstDeposit,
			Period:         &testMortgageRequestPeriod,
			Comment:        &testMortgageRequestComment,
			Contracts:      testMortgageRequestContractIDs,
			Documents:      testMortgageRequestDocumentIDs,
			SendDate:       testMortgageRequestSendDate,
			ResponseDate:   testMortgageRequestResponseDate,
			ValidTillDate:  testMortgageRequestValidTillDate,
			Percentage:     &testMortgageRequestPercentage,
			IsDeleted:      &testMortgageRequestIsDeleted,
		}

		dao := &MortgageRequestDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.SendDate.IsZero())
		assert.False(t, result.ResponseDate.IsZero())
		assert.False(t, result.ValidTillDate.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Status)
		assert.NotNil(t, result.Contact)
		assert.NotNil(t, result.Banks)
		assert.NotNil(t, result.Contracts)
		assert.NotNil(t, result.Documents)
		assert.NotNil(t, result.MortgageBroker)
		assert.NotNil(t, result.Agent)
		assert.NotNil(t, result.Deal)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Amount)
		assert.NotNil(t, result.FirstDeposit)
		assert.NotNil(t, result.Period)
		assert.NotNil(t, result.Comment)
		assert.NotNil(t, result.Percentage)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID.Hex(), testMortgageRequestID)
		assert.Equal(t, *result.InternalNumber, testMortgageRequestInternalNumber)
		assert.Equal(t, *result.Status, testMortgageRequestStatus)
		assert.Equal(t, result.Contact.Hex(), testMortgageRequestContactID)
		assert.Equal(t, utils.StringsFromObjectIDs(result.Banks), testMortgageRequestBanksIDs)
		assert.Equal(t, utils.StringsFromObjectIDs(result.Contracts), testMortgageRequestContractIDs)
		assert.Equal(t, utils.StringsFromObjectIDs(result.Documents), testMortgageRequestDocumentIDs)
		assert.Equal(t, result.MortgageBroker.Hex(), testMortgageRequestMortgageBrokerID)
		assert.Equal(t, result.Agent.Hex(), testMortgageRequestAgentID)
		assert.Equal(t, result.Deal.Hex(), testMortgageRequestDealID)
		assert.Equal(t, result.Property.Hex(), testMortgageRequestPropertyID)
		assert.Equal(t, *result.Amount, testMortgageRequestAmount)
		assert.Equal(t, *result.FirstDeposit, testMortgageRequestFirstDeposit)
		assert.Equal(t, *result.Period, testMortgageRequestPeriod)
		assert.Equal(t, *result.Comment, testMortgageRequestComment)
		assert.Equal(t, *result.Percentage, testMortgageRequestPercentage)
		assert.Equal(t, *result.IsDeleted, testMortgageRequestIsDeleted)
		assert.Equal(t, result.SendDate, testMortgageRequestSendDate)
		assert.Equal(t, result.ResponseDate, testMortgageRequestResponseDate)
		assert.Equal(t, result.ValidTillDate, testMortgageRequestValidTillDate)
		assert.Equal(t, result.CreatedAt, testMortgageRequestCreatedAt)
		assert.Equal(t, result.UpdatedAt, testMortgageRequestUpdatedAt)
	})
}

func TestMortgageRequestDAO_ToEntity(t *testing.T) {

	t.Run("EmptyMortgageRequest", func(t *testing.T) {
		dao := MortgageRequestDAO{
			ID: testMortgageRequestPrimitiveID,
		}
		result := dao.ToEntity()

		assert.Equal(t, result.ID, dao.ID.Hex())

		assert.True(t, result.SendDate.IsZero())
		assert.True(t, result.ResponseDate.IsZero())
		assert.True(t, result.ValidTillDate.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Empty(t, result.Banks)
		assert.Empty(t, result.Contracts)
		assert.Empty(t, result.Documents)

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Status)
		assert.Nil(t, result.Contact)
		assert.Nil(t, result.MortgageBroker)
		assert.Nil(t, result.Agent)
		assert.Nil(t, result.Deal)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Amount)
		assert.Nil(t, result.FirstDeposit)
		assert.Nil(t, result.Period)
		assert.Nil(t, result.Comment)
		assert.Nil(t, result.Percentage)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledMortgageRequest", func(t *testing.T) {
		dao := &MortgageRequestDAO{
			ID:             testDealPrimitiveID,
			InternalNumber: &testMortgageRequestInternalNumber,
			Status:         &testMortgageRequestStatus,
			Contact:        &testMortgageRequestPrimitiveContactID,
			Banks:          testMortgageRequestPrimitiveBankIDs,
			MortgageBroker: &testMortgageRequestPrimitiveMortgageBrokerID,
			Agent:          &testMortgageRequestPrimitiveAgentID,
			Deal:           &testMortgageRequestPrimitiveDealID,
			Property:       &testMortgageRequestPrimitivePropertyID,
			Amount:         &testMortgageRequestAmount,
			FirstDeposit:   &testMortgageRequestFirstDeposit,
			Period:         &testMortgageRequestPeriod,
			Comment:        &testMortgageRequestComment,
			Contracts:      testMortgageRequestPrimitiveContractIDs,
			Documents:      testMortgageRequestPrimitiveDocumentIDs,
			SendDate:       testMortgageRequestSendDate,
			ResponseDate:   testMortgageRequestResponseDate,
			ValidTillDate:  testMortgageRequestValidTillDate,
			Percentage:     &testMortgageRequestPercentage,
			IsDeleted:      &testMortgageRequestIsDeleted,
			CreatedAt:      testMortgageRequestCreatedAt,
			UpdatedAt:      testMortgageRequestUpdatedAt,
		}
		result := dao.ToEntity()

		assert.False(t, result.SendDate.IsZero())
		assert.False(t, result.ResponseDate.IsZero())
		assert.False(t, result.ValidTillDate.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Status)
		assert.NotNil(t, result.Contact)
		assert.NotNil(t, result.Banks)
		assert.NotNil(t, result.Contracts)
		assert.NotNil(t, result.Documents)
		assert.NotNil(t, result.MortgageBroker)
		assert.NotNil(t, result.Agent)
		assert.NotNil(t, result.Deal)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Amount)
		assert.NotNil(t, result.FirstDeposit)
		assert.NotNil(t, result.Period)
		assert.NotNil(t, result.Comment)
		assert.NotNil(t, result.Percentage)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID, dao.ID.Hex())
		assert.Equal(t, *result.InternalNumber, testMortgageRequestInternalNumber)
		assert.Equal(t, *result.Status, testMortgageRequestStatus)
		assert.Equal(t, *result.Contact, *utils.StringFromObjectID(&testMortgageRequestPrimitiveContactID))
		assert.Equal(t, result.Banks, utils.StringsFromObjectIDs(testMortgageRequestPrimitiveBankIDs))
		assert.Equal(t, result.Contracts, utils.StringsFromObjectIDs(testMortgageRequestPrimitiveContractIDs))
		assert.Equal(t, result.Documents, utils.StringsFromObjectIDs(testMortgageRequestPrimitiveDocumentIDs))
		assert.Equal(t, *result.MortgageBroker, *utils.StringFromObjectID(&testMortgageRequestPrimitiveMortgageBrokerID))
		assert.Equal(t, *result.Agent, *utils.StringFromObjectID(&testMortgageRequestPrimitiveAgentID))
		assert.Equal(t, *result.Deal, *utils.StringFromObjectID(&testMortgageRequestPrimitiveDealID))
		assert.Equal(t, *result.Property, *utils.StringFromObjectID(&testMortgageRequestPrimitivePropertyID))
		assert.Equal(t, *result.Amount, testMortgageRequestAmount)
		assert.Equal(t, *result.FirstDeposit, testMortgageRequestFirstDeposit)
		assert.Equal(t, *result.Period, testMortgageRequestPeriod)
		assert.Equal(t, *result.Comment, testMortgageRequestComment)
		assert.Equal(t, *result.Percentage, testMortgageRequestPercentage)
		assert.Equal(t, *result.IsDeleted, testMortgageRequestIsDeleted)
		assert.Equal(t, result.SendDate, testMortgageRequestSendDate)
		assert.Equal(t, result.ResponseDate, testMortgageRequestResponseDate)
		assert.Equal(t, result.ValidTillDate, testMortgageRequestValidTillDate)
		assert.Equal(t, result.CreatedAt, testMortgageRequestCreatedAt)
		assert.Equal(t, result.UpdatedAt, testMortgageRequestUpdatedAt)
	})

}

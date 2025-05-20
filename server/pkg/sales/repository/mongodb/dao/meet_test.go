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
	testMeetID                        = "64128c014984c7696d66795e"
	testMeetPrimitiveID               = primitive.NewObjectID()
	testMeetCreatedAt                 = time.Now()
	testMeetUpdatedAt                 = time.Now()
	testMeetInternalNumber            = 1
	testMeetType                      = sales_entity.MeetTypeSale
	testMeetDateTime                  = time.Now()
	testMeetPropertyID                = "64128c014984c7696d66795e"
	testMeetPrimitivePropertyID       = primitive.NewObjectID()
	testMeetAddress                   = "Green Street"
	testMeetComment                   = "Some comment"
	testMeetIsOnline                  = true
	testMeetSellerAgentID             = "64128c014984c7696d66795e"
	testMeetPrimitiveSellerAgentID    = primitive.NewObjectID()
	testMeetSellerContactID           = "64128c014984c7696d66795e"
	testMeetPrimitiveSellerContactID  = primitive.NewObjectID()
	testMeetSellerPhone               = "89999999999"
	testMeetBuyerAgentID              = "64128c014984c7696d66795e"
	testMeetPrimitiveBuyerAgentID     = primitive.NewObjectID()
	testMeetBuyerContactID            = "64128c014984c7696d66795e"
	testMeetPrimitiveBuyerContactID   = primitive.NewObjectID()
	testMeetBuyerPhone                = "89999999999"
	testMeetBuyerAgency               = "Meet buyer agency"
	testMeetStatus                    = sales_entity.MeetStatusGoingOnSale
	testMeetCancelReason              = sales_entity.MeetCancelReasonChangedMind
	testMeetCancelReasonCustom        = "Meet cancel reason custom"
	testMeetUseDealDeposit            = false
	testMeetLawerID                   = "64128c014984c7696d66795e"
	testMeetPrimitiveLawerID          = primitive.NewObjectID()
	testMeetAccountantID              = "64128c014984c7696d66795e"
	testMeetPrimitiveAccountantID     = primitive.NewObjectID()
	testMeetMortgageBrokerID          = "64128c014984c7696d66795e"
	testMeetPrimitiveMortgageBrokerID = primitive.NewObjectID()
	testMeetUseMortgage               = true
	testMeetIsDeleted                 = false
)

func TestMeetDAO_FromEntity(t *testing.T) {

	t.Run("EmptyMeet", func(t *testing.T) {
		entity := sales_entity.Meet{}
		dao := MeetDAO{}
		result := dao.FromEntity(entity)

		assert.Equal(t, result.ID, primitive.NilObjectID)

		assert.True(t, result.DateTime.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Address)
		assert.Nil(t, result.Comment)
		assert.Nil(t, result.IsOnline)
		assert.Nil(t, result.SellerAgent)
		assert.Nil(t, result.SellerContact)
		assert.Nil(t, result.SellerPhone)
		assert.Nil(t, result.BuyerAgent)
		assert.Nil(t, result.BuyerContact)
		assert.Nil(t, result.BuyerAgency)
		assert.Nil(t, result.Status)
		assert.Nil(t, result.CancelReason)
		assert.Nil(t, result.CancelReasonCustom)
		assert.Nil(t, result.UseDealDeposit)
		assert.Nil(t, result.Accountant)
		assert.Nil(t, result.Lawer)
		assert.Nil(t, result.MortgageBroker)
		assert.Nil(t, result.UseMortgage)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledMeet", func(t *testing.T) {

		entity := sales_entity.Meet{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testMeetID,
				CreatedAt: testMeetCreatedAt,
				UpdatedAt: testMeetUpdatedAt,
			},
			InternalNumber:     &testMeetInternalNumber,
			Type:               &testMeetType,
			DateTime:           testMeetDateTime,
			Property:           &testMeetPropertyID,
			Address:            &testMeetAddress,
			Comment:            &testMeetComment,
			IsOnline:           &testMeetIsOnline,
			SellerAgent:        &testMeetSellerAgentID,
			SellerContact:      &testMeetSellerContactID,
			SellerPhone:        &testMeetSellerPhone,
			BuyerAgent:         &testMeetBuyerAgentID,
			BuyerContact:       &testMeetBuyerContactID,
			BuyerPhone:         &testMeetBuyerPhone,
			BuyerAgency:        &testMeetBuyerAgency,
			Status:             &testMeetStatus,
			CancelReason:       &testMeetCancelReason,
			CancelReasonCustom: &testMeetCancelReasonCustom,
			UseDealDeposit:     &testMeetUseDealDeposit,
			Lawer:              &testMeetLawerID,
			Accountant:         &testMeetAccountantID,
			MortgageBroker:     &testMeetMortgageBrokerID,
			UseMortgage:        &testMeetUseMortgage,
			IsDeleted:          &testMeetIsDeleted,
		}

		dao := MeetDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.DateTime.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Type)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Address)
		assert.NotNil(t, result.Comment)
		assert.NotNil(t, result.IsOnline)
		assert.NotNil(t, result.SellerAgent)
		assert.NotNil(t, result.SellerContact)
		assert.NotNil(t, result.SellerPhone)
		assert.NotNil(t, result.BuyerAgent)
		assert.NotNil(t, result.BuyerContact)
		assert.NotNil(t, result.BuyerPhone)
		assert.NotNil(t, result.BuyerAgency)
		assert.NotNil(t, result.Status)
		assert.NotNil(t, result.CancelReason)
		assert.NotNil(t, result.CancelReasonCustom)
		assert.NotNil(t, result.UseDealDeposit)
		assert.NotNil(t, result.Lawer)
		assert.NotNil(t, result.Accountant)
		assert.NotNil(t, result.MortgageBroker)
		assert.NotNil(t, result.UseMortgage)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID.Hex(), testMeetID)
		assert.Equal(t, *result.InternalNumber, testMeetInternalNumber)
		assert.Equal(t, *result.Type, testMeetType)
		assert.Equal(t, result.DateTime, testMeetDateTime)
		assert.Equal(t, *utils.StringFromObjectID(result.Property), testMeetPropertyID)
		assert.Equal(t, *result.Address, testMeetAddress)
		assert.Equal(t, *result.Comment, testMeetComment)
		assert.Equal(t, *result.IsOnline, testMeetIsOnline)
		assert.Equal(t, *utils.StringFromObjectID(result.SellerAgent), testMeetSellerAgentID)
		assert.Equal(t, *utils.StringFromObjectID(result.SellerContact), testMeetSellerContactID)
		assert.Equal(t, *result.SellerPhone, testMeetSellerPhone)
		assert.Equal(t, *utils.StringFromObjectID(result.BuyerAgent), testMeetBuyerAgentID)
		assert.Equal(t, *utils.StringFromObjectID(result.BuyerContact), testMeetBuyerContactID)
		assert.Equal(t, *result.BuyerPhone, testMeetBuyerPhone)
		assert.Equal(t, *result.BuyerAgency, testMeetBuyerAgency)
		assert.Equal(t, *result.Status, testMeetStatus)
		assert.Equal(t, *result.CancelReason, testMeetCancelReason)
		assert.Equal(t, *result.CancelReasonCustom, testMeetCancelReasonCustom)
		assert.Equal(t, *result.UseDealDeposit, testMeetUseDealDeposit)
		assert.Equal(t, *utils.StringFromObjectID(result.Lawer), testMeetLawerID)
		assert.Equal(t, *utils.StringFromObjectID(result.Accountant), testMeetAccountantID)
		assert.Equal(t, *utils.StringFromObjectID(result.MortgageBroker), testMeetMortgageBrokerID)
		assert.Equal(t, *result.UseMortgage, testMeetUseMortgage)
		assert.Equal(t, *result.IsDeleted, testMeetIsDeleted)
		assert.Equal(t, result.CreatedAt, testMeetCreatedAt)
		assert.Equal(t, result.UpdatedAt, testMeetUpdatedAt)
	})

}

func TestMeetDAO_ToEntity(t *testing.T) {

	t.Run("EmptyMeet", func(t *testing.T) {
		dao := MeetDAO{
			ID: testMeetPrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.DateTime.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, dao.ID.Hex())

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Address)
		assert.Nil(t, result.Comment)
		assert.Nil(t, result.IsOnline)
		assert.Nil(t, result.SellerAgent)
		assert.Nil(t, result.SellerContact)
		assert.Nil(t, result.SellerPhone)
		assert.Nil(t, result.BuyerAgent)
		assert.Nil(t, result.BuyerContact)
		assert.Nil(t, result.BuyerAgency)
		assert.Nil(t, result.Status)
		assert.Nil(t, result.CancelReason)
		assert.Nil(t, result.CancelReasonCustom)
		assert.Nil(t, result.UseDealDeposit)
		assert.Nil(t, result.Accountant)
		assert.Nil(t, result.Lawer)
		assert.Nil(t, result.MortgageBroker)
		assert.Nil(t, result.UseMortgage)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledMeet", func(t *testing.T) {
		dao := &MeetDAO{
			ID:                 testMeetPrimitiveID,
			InternalNumber:     &testMeetInternalNumber,
			Type:               &testMeetType,
			DateTime:           testMeetDateTime,
			Property:           &testMeetPrimitivePropertyID,
			Address:            &testMeetAddress,
			Comment:            &testMeetComment,
			IsOnline:           &testMeetIsOnline,
			SellerAgent:        &testMeetPrimitiveSellerAgentID,
			SellerContact:      &testMeetPrimitiveSellerContactID,
			SellerPhone:        &testMeetSellerPhone,
			BuyerAgent:         &testMeetPrimitiveBuyerAgentID,
			BuyerContact:       &testMeetPrimitiveBuyerContactID,
			BuyerPhone:         &testMeetBuyerPhone,
			BuyerAgency:        &testMeetBuyerAgency,
			Status:             &testMeetStatus,
			CancelReason:       &testMeetCancelReason,
			CancelReasonCustom: &testMeetCancelReasonCustom,
			UseDealDeposit:     &testMeetUseDealDeposit,
			Lawer:              &testMeetPrimitiveLawerID,
			Accountant:         &testMeetPrimitiveAccountantID,
			MortgageBroker:     &testMeetPrimitiveMortgageBrokerID,
			UseMortgage:        &testMeetUseMortgage,
			IsDeleted:          &testMeetIsDeleted,
			CreatedAt:          testMeetCreatedAt,
			UpdatedAt:          testMeetUpdatedAt,
		}

		result := dao.ToEntity()

		assert.False(t, result.DateTime.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Type)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Address)
		assert.NotNil(t, result.Comment)
		assert.NotNil(t, result.IsOnline)
		assert.NotNil(t, result.SellerAgent)
		assert.NotNil(t, result.SellerContact)
		assert.NotNil(t, result.SellerPhone)
		assert.NotNil(t, result.BuyerAgent)
		assert.NotNil(t, result.BuyerContact)
		assert.NotNil(t, result.BuyerPhone)
		assert.NotNil(t, result.BuyerAgency)
		assert.NotNil(t, result.Status)
		assert.NotNil(t, result.CancelReason)
		assert.NotNil(t, result.CancelReasonCustom)
		assert.NotNil(t, result.UseDealDeposit)
		assert.NotNil(t, result.Lawer)
		assert.NotNil(t, result.Accountant)
		assert.NotNil(t, result.MortgageBroker)
		assert.NotNil(t, result.UseMortgage)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID, dao.ID.Hex())
		assert.Equal(t, *result.InternalNumber, testMeetInternalNumber)
		assert.Equal(t, *result.Type, testMeetType)
		assert.Equal(t, result.DateTime, testMeetDateTime)
		assert.Equal(t, *result.Property, *utils.StringFromObjectID((&testMeetPrimitivePropertyID)))
		assert.Equal(t, *result.Address, testMeetAddress)
		assert.Equal(t, *result.Comment, testMeetComment)
		assert.Equal(t, *result.IsOnline, testMeetIsOnline)
		assert.Equal(t, *result.SellerAgent, *utils.StringFromObjectID(&testMeetPrimitiveSellerAgentID))
		assert.Equal(t, *result.SellerContact, *utils.StringFromObjectID(&testMeetPrimitiveSellerContactID))
		assert.Equal(t, *result.SellerPhone, testMeetSellerPhone)
		assert.Equal(t, *result.BuyerAgent, *utils.StringFromObjectID(&testMeetPrimitiveBuyerAgentID))
		assert.Equal(t, *result.BuyerContact, *utils.StringFromObjectID(&testMeetPrimitiveBuyerContactID))
		assert.Equal(t, *result.BuyerPhone, testMeetBuyerPhone)
		assert.Equal(t, *result.BuyerAgency, testMeetBuyerAgency)
		assert.Equal(t, *result.Status, testMeetStatus)
		assert.Equal(t, *result.CancelReason, testMeetCancelReason)
		assert.Equal(t, *result.CancelReasonCustom, testMeetCancelReasonCustom)
		assert.Equal(t, *result.UseDealDeposit, testMeetUseDealDeposit)
		assert.Equal(t, *result.Lawer, *utils.StringFromObjectID(&testMeetPrimitiveLawerID))
		assert.Equal(t, *result.Accountant, *utils.StringFromObjectID(&testMeetPrimitiveAccountantID))
		assert.Equal(t, *result.MortgageBroker, *utils.StringFromObjectID(&testMeetPrimitiveMortgageBrokerID))
		assert.Equal(t, *result.UseMortgage, testMeetUseMortgage)
		assert.Equal(t, *result.IsDeleted, testMeetIsDeleted)
	})
}

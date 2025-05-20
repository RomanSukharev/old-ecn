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
	testDealID                           = "64128c014984c7696d66795e"
	testDealPrimitiveID                  = primitive.NewObjectID()
	testDealCreatedAt                    = time.Now()
	testDealUpdatedAt                    = time.Now()
	testDealInternalNumber               = 1
	testDealType                         = sales_entity.DealTypePurchase
	testDealStage                        = sales_entity.DealStageDeposit
	testDealSellerAgent                  = "64128c014984c7696d66795e"
	testDealPrimitiveSellerAgent         = primitive.NewObjectID()
	testDealSellerContact                = "64128c014984c7696d66795e"
	testDealPrimitiveSellerContact       = primitive.NewObjectID()
	testDealSellerPhone                  = "89999999999"
	testDealSellerDocuments              = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testDealPrimitiveSellerDocuments     = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testDealBuyerAgent                   = "64128c014984c7696d66795e"
	testDealPrimitiveBuyerAgent          = primitive.NewObjectID()
	testDealBuyerContact                 = "64128c014984c7696d66795e"
	testDealPrimitiveBuyerContact        = primitive.NewObjectID()
	testDealBuyerPhone                   = "88888888888"
	testDealBuyerDocuments               = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testDealPrimitiveBuyerDocuments      = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testDealProperty                     = "64128c014984c7696d66795e"
	testDealPrimitiveProperty            = primitive.NewObjectID()
	testDealAddress                      = "Green Street"
	testDealMortgageBroker               = "64128c014984c7696d66795e"
	testDealPrimitiveMortgageBroker      = primitive.NewObjectID()
	testDealMortgageRequest              = "64128c014984c7696d66795e"
	testDealPrimitiveMortgageRequest     = primitive.NewObjectID()
	testDealMortgageDocuments            = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testDealPrimitiveMortgageDocuments   = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testDealLawer                        = "64128c014984c7696d66795e"
	testDealPrimitiveLawer               = primitive.NewObjectID()
	testDealLawerDocuments               = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testDealPrimitiveLawerDocuments      = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testDealAccountant                   = "64128c014984c7696d66795e"
	testDealPrimitiveAccountant          = primitive.NewObjectID()
	testDealAccountantDocuments          = []string{"64128c014984c7696d66795f", "64128c014984c7696d667960"}
	testDealPrimitiveAccountantDocuments = []primitive.ObjectID{primitive.NewObjectID(), primitive.NewObjectID()}
	testDealDepositDate                  = time.Now()
	testDealDate                         = time.Now()
	testDealFinishedAt                   = time.Now()
	testDealCommissionAmount             = 1.0
	testDealInternalComment              = "Some comment"
	testDealIsDeleted                    = false
)

func TestDealDAO_FromEntity(t *testing.T) {

	t.Run("EmptyDeal", func(t *testing.T) {
		entity := sales_entity.Deal{}
		dao := &DealDAO{}
		result := dao.FromEntity(entity)

		assert.Equal(t, result.ID, primitive.NilObjectID)

		assert.True(t, result.DepositDate.IsZero())
		assert.True(t, result.DealDate.IsZero())
		assert.True(t, result.FinishedAt.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Stage)
		assert.Nil(t, result.SellerAgent)
		assert.Nil(t, result.SellerContact)
		assert.Nil(t, result.SellerPhone)
		assert.Nil(t, result.SellerDocuments)
		assert.Nil(t, result.BuyerAgent)
		assert.Nil(t, result.BuyerContact)
		assert.Nil(t, result.BuyerPhone)
		assert.Nil(t, result.BuyerDocuments)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Address)
		assert.Nil(t, result.MortgageBroker)
		assert.Nil(t, result.MortgageRequest)
		assert.Nil(t, result.MortgageDocuments)
		assert.Nil(t, result.Lawer)
		assert.Nil(t, result.LawerDocuments)
		assert.Nil(t, result.Accountant)
		assert.Nil(t, result.AccountantDocuments)
		assert.Nil(t, result.CommisionAmount)
		assert.Nil(t, result.InternalComment)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledDeal", func(t *testing.T) {

		entity := sales_entity.Deal{
			BaseDocument: shared_entity.BaseDocument{
				ID:        testDealID,
				CreatedAt: testDealCreatedAt,
				UpdatedAt: testDealUpdatedAt,
			},
			InternalNumber:      &testDealInternalNumber,
			Type:                &testDealType,
			Stage:               &testDealStage,
			SellerAgent:         &testDealSellerAgent,
			SellerContact:       &testDealSellerContact,
			SellerPhone:         &testDealSellerPhone,
			SellerDocuments:     testDealSellerDocuments,
			BuyerAgent:          &testDealBuyerAgent,
			BuyerContact:        &testDealBuyerContact,
			BuyerPhone:          &testDealBuyerPhone,
			BuyerDocuments:      testDealBuyerDocuments,
			Property:            &testDealProperty,
			Address:             &testDealAddress,
			MortgageBroker:      &testDealMortgageBroker,
			MortgageRequest:     &testDealMortgageRequest,
			MortgageDocuments:   testDealMortgageDocuments,
			Lawer:               &testDealLawer,
			LawerDocuments:      testDealLawerDocuments,
			Accountant:          &testDealAccountant,
			AccountantDocuments: testDealAccountantDocuments,
			DepositDate:         testDealDepositDate,
			DealDate:            testDealDate,
			FinishedAt:          testDealFinishedAt,
			CommisionAmount:     &testDealCommissionAmount,
			InternalComment:     &testDealInternalComment,
			IsDeleted:           &testDealIsDeleted,
		}

		dao := &DealDAO{}
		result := dao.FromEntity(entity)

		assert.False(t, result.DealDate.IsZero())
		assert.False(t, result.DealDate.IsZero())
		assert.False(t, result.FinishedAt.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Type)
		assert.NotNil(t, result.Stage)
		assert.NotNil(t, result.SellerAgent)
		assert.NotNil(t, result.SellerContact)
		assert.NotNil(t, result.SellerPhone)
		assert.NotNil(t, result.SellerDocuments)
		assert.NotNil(t, result.BuyerAgent)
		assert.NotNil(t, result.BuyerContact)
		assert.NotNil(t, result.BuyerPhone)
		assert.NotNil(t, result.BuyerDocuments)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Address)
		assert.NotNil(t, result.MortgageBroker)
		assert.NotNil(t, result.MortgageRequest)
		assert.NotNil(t, result.MortgageDocuments)
		assert.NotNil(t, result.Lawer)
		assert.NotNil(t, result.LawerDocuments)
		assert.NotNil(t, result.Accountant)
		assert.NotNil(t, result.AccountantDocuments)
		assert.NotNil(t, result.CommisionAmount)
		assert.NotNil(t, result.InternalComment)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID.Hex(), testDealID)
		assert.Equal(t, *result.InternalNumber, testDealInternalNumber)
		assert.Equal(t, *result.Type, testDealType)
		assert.Equal(t, *result.Stage, testDealStage)
		assert.Equal(t, result.SellerAgent.Hex(), testDealSellerAgent)
		assert.Equal(t, result.SellerContact.Hex(), testDealSellerContact)
		assert.Equal(t, *result.SellerPhone, testDealSellerPhone)
		assert.Equal(t, utils.StringsFromObjectIDs(result.SellerDocuments), testDealSellerDocuments)
		assert.Equal(t, result.BuyerAgent.Hex(), testDealBuyerAgent)
		assert.Equal(t, result.BuyerContact.Hex(), testDealBuyerContact)
		assert.Equal(t, *result.BuyerPhone, testDealBuyerPhone)
		assert.Equal(t, utils.StringsFromObjectIDs(result.BuyerDocuments), testDealBuyerDocuments)
		assert.Equal(t, result.Property.Hex(), testDealProperty)
		assert.Equal(t, *result.Address, testDealAddress)
		assert.Equal(t, result.MortgageBroker.Hex(), testDealMortgageBroker)
		assert.Equal(t, *utils.StringFromObjectID(result.MortgageRequest), testDealMortgageRequest)
		assert.Equal(t, utils.StringsFromObjectIDs(result.MortgageDocuments), testDealMortgageDocuments)
		assert.Equal(t, result.Lawer.Hex(), testDealLawer)
		assert.Equal(t, utils.StringsFromObjectIDs(result.LawerDocuments), testDealLawerDocuments)
		assert.Equal(t, result.Accountant.Hex(), testDealAccountant)
		assert.Equal(t, utils.StringsFromObjectIDs(result.AccountantDocuments), testDealAccountantDocuments)
		assert.Equal(t, result.DepositDate, testDealDepositDate)
		assert.Equal(t, result.DealDate, testDealDate)
		assert.Equal(t, result.FinishedAt, testDealFinishedAt)
		assert.Equal(t, *result.CommisionAmount, testDealCommissionAmount)
		assert.Equal(t, *result.InternalComment, testDealInternalComment)
		assert.Equal(t, *result.IsDeleted, testDealIsDeleted)
	})
}

func TestDealDAO_ToEntity(t *testing.T) {

	t.Run("EmptyDeal", func(t *testing.T) {
		dao := &DealDAO{
			ID: testDealPrimitiveID,
		}
		result := dao.ToEntity()

		assert.True(t, result.DealDate.IsZero())
		assert.True(t, result.DepositDate.IsZero())
		assert.True(t, result.FinishedAt.IsZero())
		assert.True(t, result.CreatedAt.IsZero())
		assert.True(t, result.UpdatedAt.IsZero())

		assert.Equal(t, result.ID, dao.ID.Hex())

		assert.Empty(t, result.SellerDocuments)
		assert.Empty(t, result.BuyerDocuments)
		assert.Empty(t, result.MortgageDocuments)
		assert.Empty(t, result.AccountantDocuments)

		assert.Nil(t, result.InternalNumber)
		assert.Nil(t, result.Type)
		assert.Nil(t, result.Stage)
		assert.Nil(t, result.SellerAgent)
		assert.Nil(t, result.SellerContact)
		assert.Nil(t, result.SellerPhone)
		assert.Nil(t, result.BuyerAgent)
		assert.Nil(t, result.BuyerContact)
		assert.Nil(t, result.BuyerPhone)
		assert.Nil(t, result.Property)
		assert.Nil(t, result.Address)
		assert.Nil(t, result.MortgageBroker)
		assert.Nil(t, result.MortgageRequest)
		assert.Nil(t, result.Lawer)
		assert.Nil(t, result.Accountant)
		assert.Nil(t, result.CommisionAmount)
		assert.Nil(t, result.InternalComment)
		assert.Nil(t, result.IsDeleted)
	})

	t.Run("FilledDeal", func(t *testing.T) {

		dao := &DealDAO{
			ID:                  testDealPrimitiveID,
			InternalNumber:      &testDealInternalNumber,
			Type:                &testDealType,
			Stage:               &testDealStage,
			SellerAgent:         &testDealPrimitiveSellerAgent,
			SellerContact:       &testDealPrimitiveSellerContact,
			SellerPhone:         &testDealSellerPhone,
			SellerDocuments:     testDealPrimitiveSellerDocuments,
			BuyerAgent:          &testDealPrimitiveBuyerAgent,
			BuyerContact:        &testDealPrimitiveBuyerContact,
			BuyerPhone:          &testDealBuyerPhone,
			BuyerDocuments:      testDealPrimitiveBuyerDocuments,
			Property:            &testDealPrimitiveProperty,
			Address:             &testDealAddress,
			MortgageBroker:      &testDealPrimitiveMortgageBroker,
			MortgageRequest:     &testDealPrimitiveMortgageRequest,
			MortgageDocuments:   testDealPrimitiveMortgageDocuments,
			Lawer:               &testDealPrimitiveLawer,
			LawerDocuments:      testDealPrimitiveLawerDocuments,
			Accountant:          &testDealPrimitiveAccountant,
			AccountantDocuments: testDealPrimitiveAccountantDocuments,
			DepositDate:         testDealDepositDate,
			DealDate:            testDealDate,
			FinishedAt:          testDealFinishedAt,
			CommisionAmount:     &testDealCommissionAmount,
			InternalComment:     &testDealInternalComment,
			CreatedAt:           testDealCreatedAt,
			UpdatedAt:           testDealUpdatedAt,
			IsDeleted:           &testDealIsDeleted,
		}

		result := dao.ToEntity()

		assert.False(t, result.DealDate.IsZero())
		assert.False(t, result.DepositDate.IsZero())
		assert.False(t, result.FinishedAt.IsZero())
		assert.False(t, result.CreatedAt.IsZero())
		assert.False(t, result.UpdatedAt.IsZero())

		assert.NotNil(t, result.ID)
		assert.NotNil(t, result.InternalNumber)
		assert.NotNil(t, result.Type)
		assert.NotNil(t, result.Stage)
		assert.NotNil(t, result.SellerAgent)
		assert.NotNil(t, result.SellerContact)
		assert.NotNil(t, result.SellerPhone)
		assert.NotNil(t, result.SellerDocuments)
		assert.NotNil(t, result.BuyerAgent)
		assert.NotNil(t, result.BuyerContact)
		assert.NotNil(t, result.BuyerPhone)
		assert.NotNil(t, result.BuyerDocuments)
		assert.NotNil(t, result.Property)
		assert.NotNil(t, result.Address)
		assert.NotNil(t, result.MortgageBroker)
		assert.NotNil(t, result.MortgageRequest)
		assert.NotNil(t, result.MortgageDocuments)
		assert.NotNil(t, result.Lawer)
		assert.NotNil(t, result.LawerDocuments)
		assert.NotNil(t, result.Accountant)
		assert.NotNil(t, result.AccountantDocuments)
		assert.NotNil(t, result.CommisionAmount)
		assert.NotNil(t, result.InternalComment)
		assert.NotNil(t, result.IsDeleted)

		assert.Equal(t, result.ID, testDealPrimitiveID.Hex())
		assert.Equal(t, *result.InternalNumber, testDealInternalNumber)
		assert.Equal(t, *result.Type, testDealType)
		assert.Equal(t, *result.Stage, testDealStage)
		assert.Equal(t, *result.SellerAgent, testDealPrimitiveSellerAgent.Hex())
		assert.Equal(t, *result.SellerContact, testDealPrimitiveSellerContact.Hex())
		assert.Equal(t, *result.SellerPhone, testDealSellerPhone)
		assert.Equal(t, result.SellerDocuments, utils.StringsFromObjectIDs(testDealPrimitiveSellerDocuments))
		assert.Equal(t, *result.BuyerAgent, testDealPrimitiveBuyerAgent.Hex())
		assert.Equal(t, *result.BuyerContact, testDealPrimitiveBuyerContact.Hex())
		assert.Equal(t, *result.BuyerPhone, testDealBuyerPhone)
		assert.Equal(t, result.BuyerDocuments, utils.StringsFromObjectIDs(testDealPrimitiveBuyerDocuments))
		assert.Equal(t, *result.Property, testDealPrimitiveProperty.Hex())
		assert.Equal(t, *result.Address, testDealAddress)
		assert.Equal(t, *result.MortgageBroker, testDealPrimitiveMortgageBroker.Hex())
		assert.Equal(t, *result.MortgageRequest, testDealPrimitiveMortgageRequest.Hex())
		assert.Equal(t, result.MortgageDocuments, utils.StringsFromObjectIDs(testDealPrimitiveMortgageDocuments))
		assert.Equal(t, *result.Lawer, testDealPrimitiveLawer.Hex())
		assert.Equal(t, result.LawerDocuments, utils.StringsFromObjectIDs(testDealPrimitiveLawerDocuments))
		assert.Equal(t, *result.Accountant, testDealPrimitiveAccountant.Hex())
		assert.Equal(t, result.AccountantDocuments, utils.StringsFromObjectIDs(testDealPrimitiveAccountantDocuments))
		assert.Equal(t, result.DealDate, testDealDate)
		assert.Equal(t, result.DepositDate, testDealDepositDate)
		assert.Equal(t, result.FinishedAt, testDealFinishedAt)
		assert.Equal(t, *result.CommisionAmount, testDealCommissionAmount)
		assert.Equal(t, *result.InternalComment, testDealInternalComment)
		assert.Equal(t, result.CreatedAt, testDealCreatedAt)
		assert.Equal(t, result.UpdatedAt, testDealUpdatedAt)
	})

}

package sales_service

import (
	"github.com/pinks-agency/ecn/server/pkg/errs"
	estate_repository "github.com/pinks-agency/ecn/server/pkg/estate/repository"
	estate_mongodb "github.com/pinks-agency/ecn/server/pkg/estate/repository/mongodb"
	sales_repository "github.com/pinks-agency/ecn/server/pkg/sales/repository"
	sales_mongodb "github.com/pinks-agency/ecn/server/pkg/sales/repository/mongodb"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"go.mongodb.org/mongo-driver/mongo"
)

type salesService struct {
	contactsDataRepo         sales_repository.IContactsDataRepository
	leadsDataRepo            sales_repository.ILeadsDataRepository
	dealsDataRepo            sales_repository.IDealsDataRepository
	meetsDataRepo            sales_repository.IMeetsDataRepository
	mortgageRequestsDataRepo sales_repository.IMortgageRequestsDataRepository
	tasksDataRepo            sales_repository.ITasksDataRepository
	propertiesDataRepo       estate_repository.IPropertyDataRepository
	systemLog                chan<- system_entity.Log
}

type salesServiceOptions func(s *salesService) error

func New(cfgs ...salesServiceOptions) (ISalesService, error) {
	os := &salesService{}

	for _, cfg := range cfgs {
		err := cfg(os)
		if err != nil {
			return nil, err
		}
	}

	return os, nil
}

func WithMongoDB(db *mongo.Database) salesServiceOptions {
	return func(os *salesService) error {
		os.contactsDataRepo = sales_mongodb.NewContactRepository(db)
		os.leadsDataRepo = sales_mongodb.NewLeadRepository(db)
		os.dealsDataRepo = sales_mongodb.NewDealRepositroy(db)
		os.meetsDataRepo = sales_mongodb.NewMeetRepository(db)
		os.mortgageRequestsDataRepo = sales_mongodb.NewMortgageRequestRepository(db)
		os.tasksDataRepo = sales_mongodb.NewTaskRepository(db)
		os.propertiesDataRepo = estate_mongodb.NewPropertyRepository(db)
		return nil
	}
}

func WithSystemLog(systemLog chan<- system_entity.Log) salesServiceOptions {
	return func(os *salesService) error {
		os.systemLog = systemLog
		return nil
	}
}

func (s *salesService) logInfo(
	logType system_entity.LogType,
	logStatus shared_entity.StatusCode,
	authorID *string,
	entityID *string) {

	s.systemLog <- system_entity.Log{
		EntityID: entityID,
		AuthorID: authorID,
		Type:     logType,
		Status:   logStatus,
		Level:    system_entity.LogLevelInfo,
	}
}

func (s *salesService) logsInfo(
	logType system_entity.LogType,
	logStatus shared_entity.StatusCode,
	authorID *string,
	entitiesID []string) {

	for _, id := range entitiesID {
		s.systemLog <- system_entity.Log{
			EntityID: &id,
			AuthorID: authorID,
			Type:     logType,
			Status:   logStatus,
			Level:    system_entity.LogLevelInfo,
		}
	}
}

func (s *salesService) logError(
	logType system_entity.LogType,
	authorID *string,
	entityID *string,
	err error) {

	s.systemLog <- system_entity.Log{
		EntityID: entityID,
		AuthorID: authorID,
		Type:     logType,
		Status:   shared_entity.StatusCode(errs.GetCodeFromError(err)),
		Level:    system_entity.LogLevelError,
	}
}

func (s *salesService) logsError(
	logType system_entity.LogType,
	authorID *string,
	entitiesID []string,
	err error) {

	for _, id := range entitiesID {
		s.systemLog <- system_entity.Log{
			EntityID: &id,
			AuthorID: authorID,
			Type:     logType,
			Status:   shared_entity.StatusCode(errs.GetCodeFromError(err)),
			Level:    system_entity.LogLevelError,
		}
	}
}

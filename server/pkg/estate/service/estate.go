package estate_service

import (
	"github.com/pinks-agency/ecn/server/pkg/errs"
	estate_repository "github.com/pinks-agency/ecn/server/pkg/estate/repository"
	estate_mongodb "github.com/pinks-agency/ecn/server/pkg/estate/repository/mongodb"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"go.mongodb.org/mongo-driver/mongo"
)

type estateService struct {
	developerDataRepo    estate_repository.IDeveloperDataRepository
	complexDataRepo      estate_repository.IComplexDataRepository
	complexHouseDataRepo estate_repository.IComplexHouseDataRepository
	villageDataRepo      estate_repository.IVillageDataRepository
	propertyDataRepo     estate_repository.IPropertyDataRepository
	systemLog            chan<- system_entity.Log
}

type estateServiceOptions func(s *estateService) error

func New(cfgs ...estateServiceOptions) (IEstateService, error) {
	os := &estateService{}

	for _, cfg := range cfgs {
		err := cfg(os)
		if err != nil {
			return nil, err
		}
	}

	go os.checkRefreshProperties()
	return os, nil
}

func WithMongoDB(db *mongo.Database) estateServiceOptions {
	return func(os *estateService) error {
		os.developerDataRepo = estate_mongodb.NewDeveloperRepository(db)
		os.complexDataRepo = estate_mongodb.NewComplexRepository(db)
		os.complexHouseDataRepo = estate_mongodb.NewComplexHouseRepository(db)
		os.villageDataRepo = estate_mongodb.NewVillageRepository(db)
		os.propertyDataRepo = estate_mongodb.NewPropertyRepository(db)
		return nil
	}
}

func WithSystemLog(systemLog chan<- system_entity.Log) estateServiceOptions {
	return func(os *estateService) error {
		os.systemLog = systemLog
		return nil
	}
}

func (s *estateService) logInfo(
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

func (s *estateService) logsInfo(
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

func (s *estateService) logError(
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

func (s *estateService) logsError(
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

package staff_service

import (
	"github.com/pinks-agency/ecn/server/pkg/errs"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_repository "github.com/pinks-agency/ecn/server/pkg/staff/repository"
	staff_mongodb "github.com/pinks-agency/ecn/server/pkg/staff/repository/mongodb"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"go.mongodb.org/mongo-driver/mongo"
)

type staffService struct {
	departmentDataRepo  staff_repository.IDepartmentDataRepository  // Department repository
	departmentCacheRepo staff_repository.IDepartmentCacheRepository // Department caching repository
	employeeDataRepo    staff_repository.IEmployeeDataRepository    // Employee repository
	employeeCacheRepo   staff_repository.IEmployeeCacheRepository   // Employee caching repository
	positionDataRepo    staff_repository.IPositionDataRepository    // Position repository
	positionCacheRepo   staff_repository.IPositionCacheRepository   // Position caching repository
	roleDataRepo        staff_repository.IRoleDataRepository        // Role repository
	roleCacheRepo       staff_repository.IRoleCacheRepository       // Role caching repository
	systemLog           chan<- system_entity.Log
}

type staffServiceOptions func(s *staffService) error

func New(cfgs ...staffServiceOptions) (IStaffService, error) {
	os := &staffService{}

	for _, cfg := range cfgs {
		err := cfg(os)
		if err != nil {
			return nil, err
		}
	}

	return os, nil
}

func WithMongoDB(db *mongo.Database) staffServiceOptions {
	return func(os *staffService) error {
		os.departmentDataRepo = staff_mongodb.NewDepartmentRepository(db)
		os.employeeDataRepo = staff_mongodb.NewEmployeeRepository(db)
		os.positionDataRepo = staff_mongodb.NewPositionRepository(db)
		os.roleDataRepo = staff_mongodb.NewRoleRepository(db)
		return nil
	}
}

func WithSystemLog(systemLog chan<- system_entity.Log) staffServiceOptions {
	return func(os *staffService) error {
		os.systemLog = systemLog
		return nil
	}
}

func (s *staffService) logInfo(
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

func (s *staffService) logsInfo(
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

func (s *staffService) logError(
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

func (s *staffService) logsError(
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

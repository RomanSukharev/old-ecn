package system_service

import (
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	system_repository "github.com/pinks-agency/ecn/server/pkg/system/repository"
	system_mongodb "github.com/pinks-agency/ecn/server/pkg/system/repository/mongodb"
	"go.mongodb.org/mongo-driver/mongo"
)

type systemService struct {
	logDataRepo system_repository.ILogDataRepository // Log data repository
	systemLog   <-chan system_entity.Log
}

type systemServiceOptions func(s *systemService) error

func New(cfgs ...systemServiceOptions) (ISystemService, error) {
	os := &systemService{}

	for _, cfg := range cfgs {
		err := cfg(os)
		if err != nil {
			return nil, err
		}
	}

	return os, nil
}

func WithMongoDB(db *mongo.Database) systemServiceOptions {
	return func(os *systemService) error {
		os.logDataRepo = system_mongodb.NewLogRepository(db)
		return nil
	}
}

func WithLogChannel(systemLog <-chan system_entity.Log) systemServiceOptions {
	return func(os *systemService) error {
		os.systemLog = systemLog
		go os.readSystemLog()
		return nil
	}
}

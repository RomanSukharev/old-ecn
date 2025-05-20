package exchange_service

import (
	exchange_repository "github.com/pinks-agency/ecn/server/pkg/exchange/repository"
	exchange_mongodb "github.com/pinks-agency/ecn/server/pkg/exchange/repository/mongodb"
	"github.com/pinks-agency/ecn/server/pkg/infrastructure"
)

type exchangeService struct {
	imageDataRepo    exchange_repository.IImageDataRepository
	documentDataRepo exchange_repository.IDocumentDataRepository
}

type exchangeServiceOptions func(s *exchangeService) error

func New(cfgs ...exchangeServiceOptions) (IExchangeService, error) {
	os := &exchangeService{}

	for _, cfg := range cfgs {
		err := cfg(os)
		if err != nil {
			return nil, err
		}
	}

	return os, nil
}

func WithMongoDBAndS3(mongodbInfra *infrastructure.MongoDB, s3Infra *infrastructure.S3) exchangeServiceOptions {
	return func(os *exchangeService) error {
		os.imageDataRepo = exchange_mongodb.NewImageRepository(mongodbInfra, s3Infra)
		os.documentDataRepo = exchange_mongodb.NewDocumentRepository(mongodbInfra, s3Infra)
		return nil
	}
}

package exchange_service

import (
	"context"
	"time"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
)

func (s *exchangeService) GetImageByID(ctx context.Context, id string) (*exchange_entity.Image, error) {
	return s.imageDataRepo.GetByID(ctx, id)
}

func (s *exchangeService) UploadImage(ctx context.Context, input exchange_entity.Image) (*exchange_entity.Image, error) {
	input.CreatedAt = time.Now()
	input.UpdatedAt = input.CreatedAt
	return s.imageDataRepo.Upload(ctx, input)
}

func (s *exchangeService) DeleteImage(ctx context.Context, id string) error {
	return s.imageDataRepo.Delete(ctx, id)
}

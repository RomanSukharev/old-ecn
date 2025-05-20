package exchange_service

import (
	"context"
	"time"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
)

func (s *exchangeService) GetDocumentByID(ctx context.Context, id string) (*exchange_entity.Document, error) {
	return s.documentDataRepo.GetByID(ctx, id)
}

func (s *exchangeService) UploadDocument(ctx context.Context, input exchange_entity.Document) (*exchange_entity.Document, error) {
	input.CreatedAt = time.Now()
	input.UpdatedAt = input.CreatedAt
	return s.documentDataRepo.Upload(ctx, input)
}

func (s *exchangeService) DeleteDocument(ctx context.Context, id string) error {
	return s.documentDataRepo.Delete(ctx, id)
}

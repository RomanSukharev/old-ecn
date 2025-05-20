package exchange_repository

import (
	"context"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
)

type IDocumentDataRepository interface {
	GetByID(ctx context.Context, id string) (*exchange_entity.Document, error)
	Upload(ctx context.Context, input exchange_entity.Document) (*exchange_entity.Document, error)
	Delete(ctx context.Context, id string) error
}

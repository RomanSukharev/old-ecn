package exchange_repository

import (
	"context"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
)

type IImageDataRepository interface {
	GetByID(ctx context.Context, id string) (*exchange_entity.Image, error)
	Upload(ctx context.Context, input exchange_entity.Image) (*exchange_entity.Image, error)
	Delete(ctx context.Context, id string) error
}

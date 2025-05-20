package staff_repository

import (
	"context"

	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type IPositionDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort staff_entity.PositionSort, filter *staff_entity.PositionFilter) ([]*staff_entity.Position, int, error)
	GetByID(ctx context.Context, id string) (*staff_entity.Position, error)
	Create(ctx context.Context, input staff_entity.Position) (*staff_entity.Position, error)
	Update(ctx context.Context, id string, input staff_entity.Position) (*staff_entity.Position, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IPositionCacheRepository interface {
	Get(ctx context.Context, key string) (*staff_entity.Position, error)
	Set(ctx context.Context, key string, input staff_entity.Position) error
	Delete(ctx context.Context, key string) error
	BulkDelete(ctx context.Context, keys []string) error
}

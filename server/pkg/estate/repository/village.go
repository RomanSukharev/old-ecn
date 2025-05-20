package estate_repository

import (
	"context"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
)

type IVillageDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort estate_entity.VillageSort, filter *estate_entity.VillageFilter) ([]*estate_entity.Village, int, error)
	GetByID(ctx context.Context, id string) (*estate_entity.Village, error)
	// GetStatsByID(ctx context.Context, id string) (*estate_entity.VillageStats, error)
	Create(ctx context.Context, input estate_entity.Village) (*estate_entity.Village, error)
	Update(ctx context.Context, id string, input estate_entity.Village) (*estate_entity.Village, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

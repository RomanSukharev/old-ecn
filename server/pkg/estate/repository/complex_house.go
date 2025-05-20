package estate_repository

import (
	"context"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
)

type IComplexHouseDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort estate_entity.ComplexHouseSort, filter *estate_entity.ComplexHouseFilter) ([]*estate_entity.ComplexHouse, int, error)
	GetByID(ctx context.Context, id string) (*estate_entity.ComplexHouse, error)
	// GetStatsByID(ctx context.Context, id string) (*estate_entity.ComplexHouseStats, error)
	Create(ctx context.Context, input estate_entity.ComplexHouse) (*estate_entity.ComplexHouse, error)
	Update(ctx context.Context, id string, input estate_entity.ComplexHouse) (*estate_entity.ComplexHouse, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

package estate_repository

import (
	"context"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
)

type IComplexDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort estate_entity.ComplexSort, filter *estate_entity.ComplexFilter) ([]*estate_entity.Complex, int, error)
	GetByID(ctx context.Context, id string) (*estate_entity.Complex, error)
	// GetStatsByID(ctx context.Context, id string) (*estate_entity.ComplexStats, error)
	Create(ctx context.Context, input estate_entity.Complex) (*estate_entity.Complex, error)
	Update(ctx context.Context, id string, input estate_entity.Complex) (*estate_entity.Complex, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

package estate_repository

import (
	"context"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
)

type IDeveloperDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort estate_entity.DeveloperSort, filter *estate_entity.DeveloperFilter) ([]*estate_entity.Developer, int, error)
	GetByID(ctx context.Context, id string) (*estate_entity.Developer, error)
	Create(ctx context.Context, input estate_entity.Developer) (*estate_entity.Developer, error)
	Update(ctx context.Context, id string, input estate_entity.Developer) (*estate_entity.Developer, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

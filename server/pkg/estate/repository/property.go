package estate_repository

import (
	"context"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
)

type IPropertyDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort estate_entity.PropertySort, filter *estate_entity.PropertyFilter) ([]*estate_entity.Property, int, error)
	GetByID(ctx context.Context, id string) (*estate_entity.Property, error)
	Create(ctx context.Context, input estate_entity.Property) (*estate_entity.Property, error)
	Update(ctx context.Context, id string, input estate_entity.Property) (*estate_entity.Property, error)
	ChangeStatus(ctx context.Context, id string, status estate_entity.PropertyStatus) error
	Delete(ctx context.Context, id string) error
	Refresh(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkChangeStatus(ctx context.Context, ids []string, status estate_entity.PropertyStatus) error
	BulkRefresh(ctx context.Context, ids []string) error
}

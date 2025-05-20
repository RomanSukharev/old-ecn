package staff_repository

import (
	"context"

	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type IDepartmentDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort staff_entity.DepartmentSort, filter *staff_entity.DepartmentFilter) ([]*staff_entity.Department, int, error)
	GetByID(ctx context.Context, id string) (*staff_entity.Department, error)
	Create(ctx context.Context, input staff_entity.Department) (*staff_entity.Department, error)
	Update(ctx context.Context, id string, input staff_entity.Department) (*staff_entity.Department, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IDepartmentCacheRepository interface {
	Get(ctx context.Context, key string) (*staff_entity.Department, error)
	Set(ctx context.Context, key string, input staff_entity.Department) error
	Delete(ctx context.Context, key string) error
	BulkDelete(ctx context.Context, keys []string) error
}

package staff_repository

import (
	"context"

	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type IRoleDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort staff_entity.RoleSort, filter *staff_entity.RoleFilter) ([]*staff_entity.Role, int, error)
	GetByID(ctx context.Context, id string) (*staff_entity.Role, error)
	Create(ctx context.Context, input staff_entity.Role) (*staff_entity.Role, error)
	Update(ctx context.Context, id string, input staff_entity.Role) (*staff_entity.Role, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IRoleCacheRepository interface {
	Get(ctx context.Context, key string) (*staff_entity.Role, error)
	Set(ctx context.Context, key string, input staff_entity.Role) error
	Delete(ctx context.Context, key string) error
	BulkDelete(ctx context.Context, keys []string) error
}

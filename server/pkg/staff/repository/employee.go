package staff_repository

import (
	"context"

	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

type IEmployeeDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort staff_entity.EmployeeSort, filter *staff_entity.EmployeeFilter) ([]*staff_entity.Employee, int, error)
	GetByID(ctx context.Context, id string) (*staff_entity.Employee, error)
	GetByEmail(ctx context.Context, email string) (*staff_entity.Employee, error)
	Create(ctx context.Context, input staff_entity.Employee) (*staff_entity.Employee, error)
	Update(ctx context.Context, id string, input staff_entity.Employee) (*staff_entity.Employee, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkActivate(ctx context.Context, ids []string, state bool) error
	BulkPublish(ctx context.Context, ids []string, state bool) error
	BulkAssignRole(ctx context.Context, ids []string, role string) error
	BulkAssignDepartment(ctx context.Context, ids []string, department string, group *string) error
}

type IEmployeeCacheRepository interface {
	Get(ctx context.Context, key string) (*staff_entity.Employee, error)
	Set(ctx context.Context, key string, input staff_entity.Employee) error
	Delete(ctx context.Context, key string) error
	BulkDelete(ctx context.Context, keys []string) error
}

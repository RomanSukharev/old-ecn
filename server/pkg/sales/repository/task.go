package sales_repository

import (
	"context"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
)

type ITasksDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort sales_entity.TaskSort, filter *sales_entity.TaskFilter) ([]*sales_entity.Task, int, error)
	GetByID(ctx context.Context, id string) (*sales_entity.Task, error)
	Create(ctx context.Context, input sales_entity.Task) (*sales_entity.Task, error)
	Update(ctx context.Context, id string, input sales_entity.Task) (*sales_entity.Task, error)
	Delete(ctx context.Context, id string) error
	Complete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkComplete(ctx context.Context, ids []string) error
	GetNextInternalNumber(ctx context.Context) (int, error)
}

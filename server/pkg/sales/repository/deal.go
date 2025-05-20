package sales_repository

import (
	"context"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
)

type IDealsDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort sales_entity.DealSort, filter *sales_entity.DealFilter) ([]*sales_entity.Deal, int, error)
	GetByID(ctx context.Context, id string) (*sales_entity.Deal, error)
	Create(ctx context.Context, input sales_entity.Deal) (*sales_entity.Deal, error)
	Update(ctx context.Context, id string, input sales_entity.Deal) (*sales_entity.Deal, error)
	Delete(ctx context.Context, id string) error
	ChangeStage(ctx context.Context, id string, stage string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkChangeStage(ctx context.Context, ids []string, stage string) error
	GetNextInternalNumber(ctx context.Context) (int, error)
}

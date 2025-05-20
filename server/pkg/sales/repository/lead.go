package sales_repository

import (
	"context"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
)

type ILeadsDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort sales_entity.LeadSort, filter *sales_entity.LeadFilter) ([]*sales_entity.Lead, int, error)
	GetByID(ctx context.Context, id string) (*sales_entity.Lead, error)
	Create(ctx context.Context, input sales_entity.Lead) (*sales_entity.Lead, error)
	Update(ctx context.Context, id string, input sales_entity.Lead) (*sales_entity.Lead, error)
	Delete(ctx context.Context, id string) error
	ChangeStatus(ctx context.Context, id string, status string, comment *string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkChangeStatus(ctx context.Context, ids []string, status string, comment *string) error
	GetNextInternalNumber(ctx context.Context) (int, error)
}

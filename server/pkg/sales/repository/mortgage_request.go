package sales_repository

import (
	"context"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
)

type IMortgageRequestsDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort sales_entity.MortgageRequestSort, filter *sales_entity.MortgageRequestFilter) ([]*sales_entity.MortgageRequest, int, error)
	GetByID(ctx context.Context, id string) (*sales_entity.MortgageRequest, error)
	Create(ctx context.Context, input sales_entity.MortgageRequest) (*sales_entity.MortgageRequest, error)
	Update(ctx context.Context, id string, input sales_entity.MortgageRequest) (*sales_entity.MortgageRequest, error)
	Delete(ctx context.Context, id string) error
	ChangeStatus(ctx context.Context, id string, status string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkChangeStatus(ctx context.Context, ids []string, status string) error
	GetNextInternalNumber(ctx context.Context) (int, error)
}

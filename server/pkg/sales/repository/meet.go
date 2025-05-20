package sales_repository

import (
	"context"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
)

type IMeetsDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort sales_entity.MeetSort, filter *sales_entity.MeetFilter) ([]*sales_entity.Meet, int, error)
	GetByID(ctx context.Context, id string) (*sales_entity.Meet, error)
	Create(ctx context.Context, input sales_entity.Meet) (*sales_entity.Meet, error)
	Update(ctx context.Context, id string, input sales_entity.Meet) (*sales_entity.Meet, error)
	Delete(ctx context.Context, id string) error
	ChangeStatus(ctx context.Context, id string, status string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkChangeStatus(ctx context.Context, ids []string, status string) error
	GetNextInternalNumber(ctx context.Context) (int, error)
}

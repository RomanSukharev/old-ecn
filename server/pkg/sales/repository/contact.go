package sales_repository

import (
	"context"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
)

type IContactsDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort sales_entity.ContactSort, filter *sales_entity.ContactFilter) ([]*sales_entity.Contact, int, error)
	GetByID(ctx context.Context, id string) (*sales_entity.Contact, error)
	Create(ctx context.Context, input sales_entity.Contact) (*sales_entity.Contact, error)
	Update(ctx context.Context, id string, input sales_entity.Contact) (*sales_entity.Contact, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
	GetNextInternalNumber(ctx context.Context) (int, error)
}

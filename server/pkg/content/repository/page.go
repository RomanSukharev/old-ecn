package content_repository

import (
	"context"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type IPageDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort content_entity.PageSort, filter *content_entity.PageFilter) ([]*content_entity.Page, int, error)
	GetByID(ctx context.Context, id string) (*content_entity.Page, error)
	GetByUrl(ctx context.Context, url string) (*content_entity.Page, error)
	Create(ctx context.Context, input content_entity.Page) (*content_entity.Page, error)
	Update(ctx context.Context, id string, input content_entity.Page) (*content_entity.Page, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IPageCacheRepository interface {
	Get(ctx context.Context, key string) (*content_entity.Page, error)
	Set(ctx context.Context, key string, input content_entity.Page) (*content_entity.Page, error)
	Delete(ctx context.Context, key string) error
}

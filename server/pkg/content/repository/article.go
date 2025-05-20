package content_repository

import (
	"context"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type IArticleDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort content_entity.ArticleSort, filter *content_entity.ArticleFilter) ([]*content_entity.Article, int, error)
	GetByID(ctx context.Context, id string) (*content_entity.Article, error)
	Create(ctx context.Context, input content_entity.Article) (*content_entity.Article, error)
	Update(ctx context.Context, id string, input content_entity.Article) (*content_entity.Article, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IArticleCacheRepository interface {
	Get(ctx context.Context, key string) (*content_entity.Article, error)
	Set(ctx context.Context, key string, input content_entity.Article) (*content_entity.Article, error)
	Delete(ctx context.Context, key string) error
}

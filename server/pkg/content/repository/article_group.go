package content_repository

import (
	"context"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type IArticleGroupDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort content_entity.ArticleGroupSort, filter *content_entity.ArticleGroupFilter) ([]*content_entity.ArticleGroup, int, error)
	GetByID(ctx context.Context, id string) (*content_entity.ArticleGroup, error)
	Create(ctx context.Context, input content_entity.ArticleGroup) (*content_entity.ArticleGroup, error)
	Update(ctx context.Context, id string, input content_entity.ArticleGroup) (*content_entity.ArticleGroup, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IArticleGroupCacheRepository interface {
	Get(ctx context.Context, key string) (*content_entity.ArticleGroup, error)
	Set(ctx context.Context, key string, input content_entity.ArticleGroup) (*content_entity.ArticleGroup, error)
	Delete(ctx context.Context, key string) error
}

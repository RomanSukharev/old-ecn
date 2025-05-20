package content_repository

import (
	"context"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type IStoryDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort content_entity.StorySort, filter *content_entity.StoryFilter) ([]*content_entity.Story, int, error)
	GetByID(ctx context.Context, id string) (*content_entity.Story, error)
	GetByUrl(ctx context.Context, url string) (*content_entity.Story, error)
	Create(ctx context.Context, input content_entity.Story) (*content_entity.Story, error)
	Update(ctx context.Context, id string, input content_entity.Story) (*content_entity.Story, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IStoryCacheRepository interface {
	Get(ctx context.Context, key string) (*content_entity.Story, error)
	Set(ctx context.Context, key string, input content_entity.Story) (*content_entity.Story, error)
	Delete(ctx context.Context, key string) error
}

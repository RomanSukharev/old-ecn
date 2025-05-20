package content_repository

import (
	"context"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type IReviewDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort content_entity.ReviewSort, filter *content_entity.ReviewFilter) ([]*content_entity.Review, int, error)
	GetByID(ctx context.Context, id string) (*content_entity.Review, error)
	Create(ctx context.Context, input content_entity.Review) (*content_entity.Review, error)
	Update(ctx context.Context, id string, input content_entity.Review) (*content_entity.Review, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
	BulkApprove(ctx context.Context, ids []string) error
	BulkDecline(ctx context.Context, ids []string) error
}

type IReviewCacheRepository interface {
	Get(ctx context.Context, key string) (*content_entity.Review, error)
	Set(ctx context.Context, key string, input content_entity.Review) (*content_entity.Review, error)
	Delete(ctx context.Context, key string) error
}

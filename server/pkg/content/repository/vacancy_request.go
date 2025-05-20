package content_repository

import (
	"context"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type IVacancyRequestDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort content_entity.VacancyRequestSort, filter *content_entity.VacancyRequestFilter) ([]*content_entity.VacancyRequest, int, error)
	GetByID(ctx context.Context, id string) (*content_entity.VacancyRequest, error)
	Create(ctx context.Context, input content_entity.VacancyRequest) (*content_entity.VacancyRequest, error)
	Update(ctx context.Context, id string, input content_entity.VacancyRequest) (*content_entity.VacancyRequest, error)
	Delete(ctx context.Context, id string) error
	Approve(ctx context.Context, id string) error
	Decline(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IVacancyRequestCacheRepository interface {
	Get(ctx context.Context, key string) (*content_entity.VacancyRequest, error)
	Set(ctx context.Context, key string, input content_entity.VacancyRequest) (*content_entity.VacancyRequest, error)
	Delete(ctx context.Context, key string) error
}

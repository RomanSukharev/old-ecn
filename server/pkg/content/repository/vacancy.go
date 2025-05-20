package content_repository

import (
	"context"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type IVacancyDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort content_entity.VacancySort, filter *content_entity.VacancyFilter) ([]*content_entity.Vacancy, int, error)
	GetByID(ctx context.Context, id string) (*content_entity.Vacancy, error)
	Create(ctx context.Context, input content_entity.Vacancy) (*content_entity.Vacancy, error)
	Update(ctx context.Context, id string, input content_entity.Vacancy) (*content_entity.Vacancy, error)
	Delete(ctx context.Context, id string) error
	BulkDelete(ctx context.Context, ids []string) error
}

type IVacancyCacheRepository interface {
	Get(ctx context.Context, key string) (*content_entity.Vacancy, error)
	Set(ctx context.Context, key string, input content_entity.Vacancy) (*content_entity.Vacancy, error)
	Delete(ctx context.Context, key string) error
}

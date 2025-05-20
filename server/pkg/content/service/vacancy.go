package content_service

import (
	"context"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

func (s *contentService) SearchVacancies(ctx context.Context, skip *int, limit *int, sort content_entity.VacancySort, filter *content_entity.VacancyFilter) ([]*content_entity.Vacancy, int, error) {
	return s.vacancyDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *contentService) GetVacancyByID(ctx context.Context, id string) (*content_entity.Vacancy, error) {
	return s.vacancyDataRepo.GetByID(ctx, id)
}

func (s *contentService) SaveVacancy(ctx context.Context, input content_entity.Vacancy) (*content_entity.Vacancy, error) {
	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		return s.vacancyDataRepo.Create(ctx, input)
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()
		return s.vacancyDataRepo.Update(ctx, input.ID, input)
	}
}

func (s *contentService) DeleteVacancy(ctx context.Context, id string) error {
	return s.vacancyDataRepo.Delete(ctx, id)
}

func (s *contentService) BulkDeleteVacancies(ctx context.Context, ids []string) error {
	return s.vacancyDataRepo.BulkDelete(ctx, ids)
}

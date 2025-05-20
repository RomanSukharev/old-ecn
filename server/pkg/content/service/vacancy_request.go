package content_service

import (
	"context"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

func (s *contentService) SearchVacancyRequests(ctx context.Context, skip *int, limit *int, sort content_entity.VacancyRequestSort, filter *content_entity.VacancyRequestFilter) ([]*content_entity.VacancyRequest, int, error) {
	return s.vacancyRequestDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *contentService) GetVacancyRequestByID(ctx context.Context, id string) (*content_entity.VacancyRequest, error) {
	return s.vacancyRequestDataRepo.GetByID(ctx, id)
}

func (s *contentService) SaveVacancyRequest(ctx context.Context, input content_entity.VacancyRequest) (*content_entity.VacancyRequest, error) {
	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		return s.vacancyRequestDataRepo.Create(ctx, input)
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()
		return s.vacancyRequestDataRepo.Update(ctx, input.ID, input)
	}
}

func (s *contentService) DeleteVacancyRequest(ctx context.Context, id string) error {
	return s.vacancyRequestDataRepo.Delete(ctx, id)
}

func (s *contentService) ApproveVacancyRequest(ctx context.Context, id string) error {
	return s.vacancyRequestDataRepo.Approve(ctx, id)
}

func (s *contentService) DeclineVacancyRequest(ctx context.Context, id string) error {
	return s.vacancyRequestDataRepo.Decline(ctx, id)
}

func (s *contentService) BulkDeleteVacancyRequests(ctx context.Context, ids []string) error {
	return s.vacancyRequestDataRepo.BulkDelete(ctx, ids)
}

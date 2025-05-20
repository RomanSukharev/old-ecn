package content_service

import (
	"context"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

func (s *contentService) SearchPages(ctx context.Context, skip *int, limit *int, sort content_entity.PageSort, filter *content_entity.PageFilter) ([]*content_entity.Page, int, error) {
	return s.pageDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *contentService) GetPageByID(ctx context.Context, id string) (*content_entity.Page, error) {
	return s.pageDataRepo.GetByID(ctx, id)
}

func (s *contentService) GetPageByUrl(ctx context.Context, url string) (*content_entity.Page, error) {
	return s.pageDataRepo.GetByUrl(ctx, url)
}

func (s *contentService) SavePage(ctx context.Context, input content_entity.Page) (*content_entity.Page, error) {
	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		return s.pageDataRepo.Create(ctx, input)
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()
		return s.pageDataRepo.Update(ctx, input.ID, input)
	}
}

func (s *contentService) DeletePage(ctx context.Context, id string) error {
	return s.pageDataRepo.Delete(ctx, id)
}

func (s *contentService) BulkDeletePages(ctx context.Context, ids []string) error {
	return s.pageDataRepo.BulkDelete(ctx, ids)
}

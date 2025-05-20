package content_service

import (
	"context"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

func (s *contentService) SearchReviews(ctx context.Context, skip *int, limit *int, sort content_entity.ReviewSort, filter *content_entity.ReviewFilter) ([]*content_entity.Review, int, error) {
	return s.reviewDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *contentService) GetReviewByID(ctx context.Context, id string) (*content_entity.Review, error) {
	return s.reviewDataRepo.GetByID(ctx, id)
}

func (s *contentService) SaveReview(ctx context.Context, input content_entity.Review) (*content_entity.Review, error) {
	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		return s.reviewDataRepo.Create(ctx, input)
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()
		return s.reviewDataRepo.Update(ctx, input.ID, input)
	}
}

func (s *contentService) DeleteReview(ctx context.Context, id string) error {
	return s.reviewDataRepo.Delete(ctx, id)
}

func (s *contentService) BulkDeleteReviews(ctx context.Context, ids []string) error {
	return s.reviewDataRepo.BulkDelete(ctx, ids)
}

func (s *contentService) BulkApproveReviews(ctx context.Context, ids []string) error {
	return s.reviewDataRepo.BulkApprove(ctx, ids)
}

func (s *contentService) BulkDeclineReviews(ctx context.Context, ids []string) error {
	return s.reviewDataRepo.BulkDecline(ctx, ids)
}

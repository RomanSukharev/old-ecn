package content_service

import (
	"context"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

func (s *contentService) SearchArticleGroups(ctx context.Context, skip *int, limit *int, sort content_entity.ArticleGroupSort, filter *content_entity.ArticleGroupFilter) ([]*content_entity.ArticleGroup, int, error) {
	return s.articleGroupDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *contentService) GetArticleGroupByID(ctx context.Context, id string) (*content_entity.ArticleGroup, error) {
	return s.articleGroupDataRepo.GetByID(ctx, id)
}

func (s *contentService) SaveArticleGroup(ctx context.Context, input content_entity.ArticleGroup) (*content_entity.ArticleGroup, error) {
	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		return s.articleGroupDataRepo.Create(ctx, input)
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()
		return s.articleGroupDataRepo.Update(ctx, input.ID, input)
	}
}

func (s *contentService) DeleteArticleGroup(ctx context.Context, id string) error {
	return s.articleGroupDataRepo.Delete(ctx, id)
}

func (s *contentService) BulkDeleteArticleGroups(ctx context.Context, ids []string) error {
	return s.articleGroupDataRepo.BulkDelete(ctx, ids)
}

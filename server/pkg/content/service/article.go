package content_service

import (
	"context"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

func (s *contentService) SearchArticles(ctx context.Context, skip *int, limit *int, sort content_entity.ArticleSort, filter *content_entity.ArticleFilter) ([]*content_entity.Article, int, error) {
	return s.articleDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *contentService) GetArticleByID(ctx context.Context, id string) (*content_entity.Article, error) {
	return s.articleDataRepo.GetByID(ctx, id)
}

func (s *contentService) SaveArticle(ctx context.Context, input content_entity.Article) (*content_entity.Article, error) {
	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		return s.articleDataRepo.Create(ctx, input)
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()
		return s.articleDataRepo.Update(ctx, input.ID, input)
	}
}

func (s *contentService) DeleteArticle(ctx context.Context, id string) error {
	return s.articleDataRepo.Delete(ctx, id)
}

func (s *contentService) BulkDeleteArticles(ctx context.Context, ids []string) error {
	return s.articleDataRepo.BulkDelete(ctx, ids)
}

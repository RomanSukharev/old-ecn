package content_service

import (
	"context"
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

func (s *contentService) SearchStories(ctx context.Context, skip *int, limit *int, sort content_entity.StorySort, filter *content_entity.StoryFilter) ([]*content_entity.Story, int, error) {
	return s.storyDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *contentService) GetStoryByID(ctx context.Context, id string) (*content_entity.Story, error) {
	return s.storyDataRepo.GetByID(ctx, id)
}

func (s *contentService) GetStoryByUrl(ctx context.Context, url string) (*content_entity.Story, error) {
	return s.storyDataRepo.GetByUrl(ctx, url)
}

func (s *contentService) SaveStory(ctx context.Context, input content_entity.Story) (*content_entity.Story, error) {
	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		return s.storyDataRepo.Create(ctx, input)
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()
		return s.storyDataRepo.Update(ctx, input.ID, input)
	}
}

func (s *contentService) DeleteStory(ctx context.Context, id string) error {
	return s.storyDataRepo.Delete(ctx, id)
}

func (s *contentService) BulkDeleteStories(ctx context.Context, ids []string) error {
	return s.storyDataRepo.BulkDelete(ctx, ids)
}

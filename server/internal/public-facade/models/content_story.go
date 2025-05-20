package public_models

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Story struct {
	ID            string                `json:"id"`
	Category      StoryCategoryEnum     `json:"category"`
	Title         string                `json:"title"`
	Teaser        *string               `json:"teaser,omitempty"`
	ContentBlocks []ContentBlock        `json:"contentBlocks"`
	CoverID       *string               `json:"-"`
	Status        PublicationStatusEnum `json:"status"`
	CreatedAt     time.Time             `json:"createdAt"`
	UpdatedAt     time.Time             `json:"updatedAt"`
}

func (m *Story) FromEntity(e *content_entity.Story) *Story {
	var contentBlocks []ContentBlock
	for _, v := range e.ContentBlocks {
		contentBlocks = append(contentBlocks, ContentBlock{
			Type:      ContentBlockType(v.Type),
			Data:      v.Data,
			IsVisible: v.IsVisible,
		})
	}

	m = &Story{
		ID:            e.ID,
		Title:         e.Title,
		Category:      StoryCategoryEnum(e.Category),
		CoverID:       e.CoverID,
		Status:        PublicationStatusEnum(e.PublicationStatus),
		ContentBlocks: contentBlocks,
		CreatedAt:     e.CreatedAt,
		UpdatedAt:     e.UpdatedAt,
	}

	return m
}

type StoryInput struct {
	ID            string                `json:"id,omitempty"`
	Category      StoryCategoryEnum     `json:"category"`
	Title         string                `json:"title"`
	Teaser        *string               `json:"teaser,omitempty"`
	ContentBlocks []ContentBlockInput   `json:"contentBlocks"`
	Status        PublicationStatusEnum `json:"status"`
	CoverID       *string               `json:"-"`
}

func (m *StoryInput) ToEntity() *content_entity.Story {
	var contentBlocks []content_entity.ContentBlock
	for _, v := range m.ContentBlocks {
		contentBlocks = append(contentBlocks, content_entity.ContentBlock{
			Type:      content_entity.ContentBlockType(v.Type),
			Data:      v.Data,
			IsVisible: v.IsVisible,
		})
	}

	return &content_entity.Story{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Category:          content_entity.StoryCategory(m.Category),
		Title:             m.Title,
		Teaser:            *m.Teaser,
		CoverID:           m.CoverID,
		PublicationStatus: shared_entity.PublicationStatus(m.Status),
		ContentBlocks:     contentBlocks,
	}
}

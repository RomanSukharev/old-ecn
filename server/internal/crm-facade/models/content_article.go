package crm_models

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Article struct {
	ID            string                `json:"id"`
	Title         string                `json:"title"`
	ContentBlocks []ContentBlock        `json:"contentBlocks"`
	Status        PublicationStatusEnum `json:"status"`
	CreatedAt     time.Time             `json:"createdAt"`
	UpdatedAt     time.Time             `json:"updatedAt"`
	CoverID       *string               `json:"-"`
	GroupID       *string               `json:"-"`
}

func (m *Article) FromEntity(e *content_entity.Article) *Article {
	var contentBlocks []ContentBlock
	for _, v := range e.ContentBlocks {
		contentBlocks = append(contentBlocks, ContentBlock{
			Type:      ContentBlockType(v.Type),
			Data:      v.Data,
			IsVisible: v.IsVisible,
		})
	}

	m = &Article{
		ID:            e.ID,
		Title:         e.Title,
		GroupID:       e.GroupID,
		CoverID:       e.CoverID,
		Status:        PublicationStatusEnum(e.PublicationStatus),
		ContentBlocks: contentBlocks,
		CreatedAt:     e.CreatedAt,
		UpdatedAt:     e.UpdatedAt,
	}

	return m
}

type ArticleInput struct {
	ID            string                `json:"id,omitempty"`
	Title         string                `json:"title"`
	ContentBlocks []ContentBlockInput   `json:"contentBlocks"`
	Status        PublicationStatusEnum `json:"status"`
	GroupID       *string               `json:"-"`
	CoverID       *string               `json:"-"`
}

func (m *ArticleInput) ToEntity() *content_entity.Article {
	var contentBlocks []content_entity.ContentBlock
	for _, v := range m.ContentBlocks {
		contentBlocks = append(contentBlocks, content_entity.ContentBlock{
			Type:      content_entity.ContentBlockType(v.Type),
			Data:      v.Data,
			IsVisible: v.IsVisible,
		})
	}

	return &content_entity.Article{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		GroupID:           m.GroupID,
		Title:             m.Title,
		CoverID:           m.CoverID,
		PublicationStatus: shared_entity.PublicationStatus(m.Status),
		ContentBlocks:     contentBlocks,
	}
}

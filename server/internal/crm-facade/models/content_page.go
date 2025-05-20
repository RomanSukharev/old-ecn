package crm_models

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Page struct {
	ID            string                `json:"id"`
	URL           string                `json:"url"`
	Title         string                `json:"title"`
	Description   string                `json:"description"`
	ContentBlocks []ContentBlock        `json:"contentBlocks"`
	Status        PublicationStatusEnum `json:"status"`
	CreatedAt     time.Time             `json:"createdAt"`
	UpdatedAt     time.Time             `json:"updatedAt"`
}

func (m *Page) FromEntity(e *content_entity.Page) *Page {
	contentBlocks := make([]ContentBlock, 0, len(e.ContentBlocks))
	for _, v := range e.ContentBlocks {
		contentBlocks = append(contentBlocks, ContentBlock{
			Type:      ContentBlockType(v.Type),
			Data:      v.Data,
			IsVisible: v.IsVisible,
		})
	}

	m = &Page{
		ID:            e.ID,
		URL:           e.Url,
		Title:         e.Title,
		Description:   e.Description,
		Status:        PublicationStatusEnum(e.PublicationStatus),
		ContentBlocks: contentBlocks,
		CreatedAt:     e.CreatedAt,
		UpdatedAt:     e.UpdatedAt,
	}

	return m
}

type PageInput struct {
	ID            string                `json:"id,omitempty"`
	URL           string                `json:"url"`
	Title         string                `json:"title"`
	Description   string                `json:"description"`
	ContentBlocks []ContentBlockInput   `json:"contentBlocks"`
	Status        PublicationStatusEnum `json:"status"`
}

func (m *PageInput) ToEntity() *content_entity.Page {
	contentBlocks := make([]content_entity.ContentBlock, 0, len(m.ContentBlocks))
	for _, v := range m.ContentBlocks {
		contentBlocks = append(contentBlocks, content_entity.ContentBlock{
			Type:      content_entity.ContentBlockType(v.Type),
			Data:      v.Data,
			IsVisible: v.IsVisible,
		})
	}

	return &content_entity.Page{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Url:               m.URL,
		Title:             m.Title,
		Description:       m.Description,
		PublicationStatus: shared_entity.PublicationStatus(m.Status),
		ContentBlocks:     contentBlocks,
	}
}

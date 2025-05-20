package crm_models

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type ArticleGroup struct {
	ID        string    `json:"id"`
	Title     string    `json:"title"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func (m *ArticleGroup) FromEntity(e *content_entity.ArticleGroup) *ArticleGroup {
	m = &ArticleGroup{
		ID:        e.ID,
		Title:     e.Title,
		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
	}

	return m
}

type ArticleGroupInput struct {
	ID    string `json:"id,omitempty"`
	Title string `json:"title"`
}

func (m *ArticleGroupInput) ToEntity() *content_entity.ArticleGroup {
	return &content_entity.ArticleGroup{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title: m.Title,
	}
}

package crm_models

import (
	"time"

	"github.com/99designs/gqlgen/graphql"
	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Document struct {
	ID        string    `json:"id"`
	URL       string    `json:"url"`
	Path      string    `json:"path"`
	Title     string    `json:"title,omitempty"`
	FileName  string    `json:"fileName"`
	FileType  string    `json:"fileType"`
	CreatedAt time.Time `json:"createdAt"`
}

func (m *Document) FromEntity(e *exchange_entity.Document) *Document {
	m = &Document{
		ID:        e.ID,
		URL:       e.URL,
		Path:      e.Path,
		Title:     e.Title,
		FileName:  e.FileName,
		FileType:  e.FileType,
		CreatedAt: e.CreatedAt,
	}

	return m
}

type DocumentInput struct {
	ID    string          `json:"id,omitempty"`
	Title string          `json:"title,omitempty"`
	File  *graphql.Upload `json:"file,omitempty"`
}

func (m *DocumentInput) ToEntity() *exchange_entity.Document {
	result := &exchange_entity.Document{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title: m.Title,
	}

	if m.File != nil {
		result.FileName = m.File.Filename
		result.FileType = m.File.ContentType
		result.File = m.File.File
	}

	return result
}

package public_models

import (
	"time"

	"github.com/99designs/gqlgen/graphql"
	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Image struct {
	ID          string      `json:"id"`
	URL         string      `json:"url"`
	Path        string      `json:"path"`
	Title       string      `json:"title,omitempty"`
	FileName    string      `json:"fileName"`
	FileType    string      `json:"fileType"`
	PreviewURL  string      `json:"previewUrl,omitempty"`
	PreviewPath string      `json:"previewPath,omitempty"`
	BlurHash    string      `json:"blurHash,omitempty"`
	Preset      ImagePreset `json:"preset,omitempty"`
	CreatedAt   time.Time   `json:"createdAt"`
}

func (m *Image) FromEntity(e *exchange_entity.Image) *Image {
	m = &Image{
		ID:          e.ID,
		URL:         e.URL,
		Path:        e.Path,
		Title:       e.Title,
		FileName:    e.FileName,
		FileType:    e.FileType,
		PreviewURL:  e.PreviewURL,
		PreviewPath: e.PreviewPath,
		BlurHash:    e.BlurHash,
		Preset:      ImagePreset(e.Preset),
		CreatedAt:   e.CreatedAt,
	}

	return m
}

type ImageInput struct {
	ID     string          `json:"id,omitempty"`
	Title  string          `json:"title,omitempty"`
	Preset ImagePreset     `json:"preset,omitempty"`
	File   *graphql.Upload `json:"file,omitempty"`
}

func (m *ImageInput) ToEntity() *exchange_entity.Image {
	result := &exchange_entity.Image{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title:  m.Title,
		Preset: exchange_entity.ImagePreset(m.Preset),
	}

	if m.File != nil {
		result.FileName = m.File.Filename
		result.FileType = m.File.ContentType
		result.File = m.File.File
	}

	return result
}

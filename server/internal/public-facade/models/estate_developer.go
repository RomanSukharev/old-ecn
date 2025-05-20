package public_models

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Developer struct {
	ID string `json:"id,omitempty"`

	Title  string  `json:"title,omitempty"`
	URL    string  `json:"url,omitempty"`
	LogoID *string `json:"-"`

	CreatedAt time.Time `json:"createdAt,omitempty"`
	UpdatedAt time.Time `json:"updatedAt,omitempty"`
}

func (m *Developer) FromEntity(e *estate_entity.Developer) *Developer {
	m = &Developer{
		ID: e.ID,

		Title:  *e.Title,
		URL:    *e.URL,
		LogoID: e.LogoID,

		CreatedAt: e.CreatedAt,
		UpdatedAt: e.UpdatedAt,
	}

	return m
}

type DeveloperInput struct {
	ID string `json:"id,omitempty"`

	Title  string  `json:"title,omitempty"`
	URL    string  `json:"url,omitempty"`
	LogoID *string `json:"-"`
}

func (m *DeveloperInput) ToEntity() *estate_entity.Developer {
	return &estate_entity.Developer{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},

		Title:  &m.Title,
		URL:    &m.URL,
		LogoID: m.LogoID,
	}
}

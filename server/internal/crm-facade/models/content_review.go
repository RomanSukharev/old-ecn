package crm_models

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Review struct {
	ID                string                `json:"id"`
	EmployeeID        *string               `json:"-"`
	Text              string                `json:"text"`
	AuthorName        string                `json:"authorName"`
	AuthorPhone       string                `json:"authorPhone"`
	Status            ReviewStatusEnum      `json:"status"`
	PublicationStatus PublicationStatusEnum `json:"publicationStatus"`
	CreatedAt         time.Time             `json:"createdAt"`
	UpdatedAt         time.Time             `json:"updatedAt"`
}

func (m *Review) FromEntity(e *content_entity.Review) *Review {
	m = &Review{
		ID:                e.ID,
		EmployeeID:        e.EmployeeID,
		Text:              e.Text,
		AuthorName:        e.AuthorName,
		AuthorPhone:       e.AuthorPhone,
		Status:            ReviewStatusEnum(e.Status),
		PublicationStatus: PublicationStatusEnum(e.PublicationStatus),
		CreatedAt:         e.CreatedAt,
		UpdatedAt:         e.UpdatedAt,
	}

	return m
}

type ReviewInput struct {
	ID          string           `json:"id,omitempty"`
	EmployeeID  string           `json:"-"`
	Text        string           `json:"text"`
	AuthorName  string           `json:"authorName"`
	AuthorPhone string           `json:"authorPhone"`
	Status      ReviewStatusEnum `json:"status"`
}

func (m *ReviewInput) ToEntity() *content_entity.Review {
	return &content_entity.Review{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		EmployeeID:  &m.EmployeeID,
		Text:        m.Text,
		AuthorName:  m.AuthorName,
		AuthorPhone: m.AuthorPhone,
		Status:      content_entity.ReviewStatus(m.Status),
	}
}

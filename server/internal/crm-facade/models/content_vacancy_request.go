package crm_models

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
)

type VacancyRequest struct {
	ID              string                   `json:"id"`
	Vacancy         *Vacancy                 `json:"vacancy"`
	Name            string                   `json:"name"`
	Letter          string                   `json:"letter"`
	Attachments     []*Document              `json:"attachments,omitempty"`
	InternalComment *string                  `json:"internalComment,omitempty"`
	Status          VacancyRequestStatusEnum `json:"status"`
	CreatedAt       time.Time                `json:"createdAt"`
	UpdatedAt       time.Time                `json:"updatedAt"`
}

func (m *VacancyRequest) FromEntity(e *content_entity.VacancyRequest) *VacancyRequest {
	m = &VacancyRequest{
		ID:              e.ID,
		Name:            e.Name,
		Letter:          e.Letter,
		InternalComment: &e.InternalComment,
		Status:          VacancyRequestStatusEnum(e.Status),
		CreatedAt:       e.CreatedAt,
		UpdatedAt:       e.UpdatedAt,
	}

	return m
}

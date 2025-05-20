package public_models

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

type Vacancy struct {
	ID                string                `json:"id"`
	Title             string                `json:"title"`
	Description       string                `json:"description"`
	Experience        *string               `json:"experience,omitempty"`
	Salary            *string               `json:"salary,omitempty"`
	Schedule          VacancyScheduleEnum   `json:"schedule"`
	PublicationStatus PublicationStatusEnum `json:"publicationStatus"`
	CreatedAt         time.Time             `json:"createdAt"`
	UpdatedAt         time.Time             `json:"updatedAt"`
}

func (m *Vacancy) FromEntity(e *content_entity.Vacancy) *Vacancy {
	m = &Vacancy{
		ID:                e.ID,
		Title:             e.Title,
		Description:       e.Description,
		Experience:        &e.Experience,
		Salary:            &e.Salary,
		Schedule:          VacancyScheduleEnum(e.Schedule),
		PublicationStatus: PublicationStatusEnum(e.PublicationStatus),
		CreatedAt:         e.CreatedAt,
		UpdatedAt:         e.UpdatedAt,
	}

	return m
}

type VacancyInput struct {
	ID                string                `json:"id,omitempty"`
	Title             string                `json:"title"`
	Description       string                `json:"description"`
	Experience        string                `json:"experience,omitempty"`
	Salary            string                `json:"salary,omitempty"`
	Schedule          VacancyScheduleEnum   `json:"schedule"`
	PublicationStatus PublicationStatusEnum `json:"publicationStatus"`
}

func (m *VacancyInput) ToEntity() *content_entity.Vacancy {
	return &content_entity.Vacancy{
		BaseDocument: shared_entity.BaseDocument{
			ID: m.ID,
		},
		Title:             m.Title,
		Description:       m.Description,
		Experience:        m.Experience,
		Salary:            m.Salary,
		PublicationStatus: shared_entity.PublicationStatus(m.PublicationStatus),
	}
}

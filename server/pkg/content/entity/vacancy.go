package content_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Вакансия
type Vacancy struct {
	shared_entity.BaseDocument
	Title             string                          // Заголовок вакансии
	Description       string                          // Описание вакансии
	Experience        string                          // Требуемый опыт работы
	Salary            string                          // Ориентировочная заработная плата
	Schedule          VacancySchedule                 // Режим работы
	PublicationStatus shared_entity.PublicationStatus // Статус публикации
}

type VacancySchedule string // Режим работы

const (
	VacancyScheduleFullTime VacancySchedule = "FULL_TIME" // Полная занятость
	VacancySchedulePartTime VacancySchedule = "PART_TIME" // Частичная занятость
)

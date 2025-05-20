package content_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр вакансий
type VacancyFilter struct {
	Schedule          *VacancySchedule                 // Режим работы
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type VacancySort int // Сортировка вакансий

const (
	VacancySortDefault       VacancySort = iota // Сортировка по умолчанию (не задана)
	VacancySortTitleAsc                         // Сортировка по названию (по возрастанию)
	VacancySortTitleDesc                        // Сортировка по названию (по убыванию)
	VacancySortCreatedAtAsc                     // Сортировка по дате создания (по возрастанию)
	VacancySortCreatedAtDesc                    // Сортировка по дате создания (по убыванию)
)

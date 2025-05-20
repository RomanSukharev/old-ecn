package content_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр отзывов на сотрудников
type ReviewFilter struct {
	EmployeeID        *string                          // Идентификатор сотрудника
	Status            *ReviewStatus                    // Статус отзыва
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации отзыва
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type ReviewSort int // Сортировка отзывов

const (
	ReviewSortDefault       ReviewSort = iota // Сортировка по умолчанию (не задана)
	ReviewSortCreatedAtAsc                    // Сортировка по дате создания (по возрастанию)
	ReviewSortCreatedAtDesc                   // Сортировка по дате создания (по убыванию)
)

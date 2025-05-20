package content_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр страниц
type PageFilter struct {
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type PageSort int // Сортировка страниц

const (
	PageSortDefault   PageSort = iota // Сортировка по умолчанию (не задана)
	PageSortTitleAsc                  // Сортировка по заголовку (по возрастанию)
	PageSortTitleDesc                 // Сортировка по заголовку (по убыванию)
)

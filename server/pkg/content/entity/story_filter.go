package content_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр новостей
type StoryFilter struct {
	Category          *StoryCategory                   // Категория новости
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type StorySort int // Сортировка новостей

const (
	StorySortDefault       StorySort = iota // Сортировка по умолчанию (не задана)
	StorySortCreatedAtAsc                   // Сортировка по дате создания (по возрастанию)
	StorySortCreatedAtDesc                  // Сортировка по дате создания (по убыванию)
)

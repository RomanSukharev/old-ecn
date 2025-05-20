package content_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр статей базы знаний
type ArticleFilter struct {
	GroupID           *string                          // Родительская группа
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type ArticleSort int // Сортировка статей

const (
	ArticleSortDefault   ArticleSort = iota // Сортировка по умолчанию (не задана)
	ArticleSortTitleAsc                     // Сортировка по заголовку (по возрастанию)
	ArticleSortTitleDesc                    // Сортировка по заголовку (по убыванию)
)

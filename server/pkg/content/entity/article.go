package content_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Статья базы знаний
type Article struct {
	shared_entity.BaseDocument
	GroupID           *string                         // Родительская группа
	Title             string                          // Заголовок статьи
	CoverID           *string                         // Идентификатор изображения обложки
	ContentBlocks     ContentBlocks                   // Набор блоков контента
	PublicationStatus shared_entity.PublicationStatus // Статус публикации
}

type Articles []Article     // Массив статей
type ArticlePtrs []*Article // Массив указателей на статьи

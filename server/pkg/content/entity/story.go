package content_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Новость
type Story struct {
	shared_entity.BaseDocument
	Category          StoryCategory                   // Категория новости
	Title             string                          // Заголовок новости
	Teaser            string                          // Краткий текст
	CoverID           *string                         // Идентификатор изображения обложки
	PublicationStatus shared_entity.PublicationStatus // Статус публикации
	ContentBlocks     ContentBlocks                   // Массив блоков контента
}

type StoryCategory string // Категория новости

const (
	StoryCategoryNews    StoryCategory = "NEWS"    // Новости
	StoryCategoryEstate  StoryCategory = "ESTATE"  // Недвижимость
	StoryCategoryCompany StoryCategory = "COMPANY" // Жизнь компании
)

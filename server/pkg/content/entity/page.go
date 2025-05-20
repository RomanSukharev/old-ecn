package content_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Страница сайта
type Page struct {
	shared_entity.BaseDocument
	Url               string                          // Относительный адрес страницы
	Title             string                          // Заголовок страницы
	Description       string                          // Мета-описание страницы
	ContentBlocks     ContentBlocks                   // Массив контент-блоков
	PublicationStatus shared_entity.PublicationStatus // Статус публикации
}

type Pages []Page     // Массив страниц
type PagePtrs []*Page // Массив указателей на страницы

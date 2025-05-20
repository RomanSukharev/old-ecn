package estate_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// ЖК (жилой комплекс)
type Complex struct {
	shared_entity.BaseDocument

	Title         *string  // Название ЖК
	Description   *string  // Описание
	Address       *string  // Адрес
	Lat           *float64 // Широта
	Lon           *float64 // Долгота
	CadastrNumber *string  // Кадастровый номер
	SeoText       *string  // Описание для SEO
	YoutubeLink   *string  // Ссылка на YT
	TourLink      *string  // Ссылка на 3Д-тур

	InCity       *bool   // В черте города
	CityDistance *int    // Расстояние до города
	Region       *string // Район
	SubRegion    *string // Микрорайон

	DeveloperID *string // Идентификатор застройщика

	IsReady          *bool    // ЖК сдан
	ReadinessQuarter *Quarter // Квартал сдачи
	ReadinessYear    *int     // Год сдачи

	ImageIDs              []string // Идентификаторы изображений
	DocumentIDs           []string // Идентификаторы документыов
	ProjectDeclarationIDs []string // Идентификаторы проектной декларации

	PublicationStatus *shared_entity.PublicationStatus // Статус публикации

	InternalInfo *string // Служебная информация

	IsDeleted *bool // Признак удаления
}

type Complexes []Complex
type ComplexPtrs []*Complex

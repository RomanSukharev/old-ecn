package estate_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Новостройка
type ComplexHouse struct {
	shared_entity.BaseDocument

	ComplexID *string // Идентификатор ЖК

	Title         *string  // Название новостройки
	Description   *string  // Описание
	Address       *string  // Объект адреса
	Lat           *float64 // Широта
	Lon           *float64 // Долгота
	CadastrNumber *string  // Кадастровый номер
	SeoText       *string  // Описание для SEO
	YoutubeLink   *string  // Ссылка на YT
	TourLink      *string  // Ссылка на 3Д-тур

	IsReady          *bool    // ГП сдан
	ReadinessQuarter *Quarter // Квартал сдачи
	ReadinessYear    *int     // Год сдачи

	ImageIDs              []string // Идентификаторы изображений
	DocumentIDs           []string // Идентификаторы документыов
	ProjectDeclarationIDs []string // Идентификаторы проектной декларации

	PublicationStatus *shared_entity.PublicationStatus // Статус публикации

	InternalInfo *string // Служебная информация

	IsDeleted *bool // Признак удаления
}

type ComplexHouses []ComplexHouse
type ComplexHousePtrs []*ComplexHouse

// Структура этажа дома в ЖК
type ComplexFloorStructure struct {
	shared_entity.BaseDocument
	ComplexHouseID *string  // Идентификатор новостройки
	Entrance       int      // Подъезд, если не указан - выбирается для всего дома (пример - паркинг, цоколь)
	Floor          int      // Номер этажа (подземные - отрицательные)
	Title          string   // Название этажа (полезно для паркингов и двухуровневых/мансардных этажей)
	PropertyCount  int      // Количество объектов на этаже (для построения схемы)
	FloorPlanIDs   []string // Изображение планировки этажа
}

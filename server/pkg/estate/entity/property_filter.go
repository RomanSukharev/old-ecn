package estate_entity

import (
	"time"
)

// Фильтр объектов недвижимости
type PropertyFilter struct {
	Deal             *Deal            // Вид сделки
	Type             *PropertyType    // Тип объекта
	SubType          *PropertySubType // Подтип объекта
	FromDeveloper    *bool            // От застройщика
	ComplexID        *string          // Идентификатор ЖК
	ComplexHouseID   *string          // Идентификатор ГП
	VillageID        *string          // Идентификатор КП
	IsHot            *bool            // Горячее предложение
	IsDeleted        *bool            // Признак удаления
	Statuses         []PropertyStatus // Статусы объекта
	IsStudio         *bool            //
	MinRooms         *float64         //
	MaxRooms         *float64         //
	MinPrice         *float64         // Цена от
	MaxPrice         *float64         // Цена до
	MinPricePerMeter *float64         // Цена за квадрат от
	MaxPricePerMeter *float64         // Цена за квадрат до
	MinPricePerAr    *float64         // Цена за сотку от
	MaxPricePerAr    *float64         // Цена за сотку до
	MinArea          *float64         // Площадь общая от
	MaxArea          *float64         // Площадь общая до
	MinLandArea      *float64         // Площадь участка от
	MaxLandArea      *float64         // Площадь участка до
	IsReady          *bool            // Объект сдан
	InCity           *bool            // В черте города
	MinCityDistance  *int             // Расстояние до города от
	MaxCityDistance  *int             // Расстояние до города до
	MinCreatedAt     time.Time        // Дата создания от
	MaxCreatedAt     time.Time        // Дата создания до
	WithPhotos       *bool            // С фотографиями
	Keyword          *string          // Ключевое слово для полнотекстового поиска
}

type PropertySort int // Сортировка объектов недвижимости

const (
	PropertySortDefault       PropertySort = iota // Сортировка по умолчанию (не задана)
	PropertySortTitleAsc                          // Сортировка по заголовку (по возрастанию)
	PropertySortTitleDesc                         // Сортировка по заголовку (по убыванию)
	PropertySortCreatedAtAsc                      // Сортировка по дате создания (по возрастанию)
	PropertySortCreatedAtDesc                     // Сортировка по дате создания (по убыванию)
)

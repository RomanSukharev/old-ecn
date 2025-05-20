package estate_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр ГП в ЖК
type ComplexHouseFilter struct {
	ComplexID         *string                          // Идентификатор ЖК
	IsDeleted         *bool                            // Признак удаления
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации
	WithPhotos        *bool                            // С фотографиями
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type ComplexHouseSort int // Сортировка ГП в ЖК

const (
	ComplexHouseSortDefault   ComplexHouseSort = iota // Сортировка по умолчанию (не задана)
	ComplexHouseSortTitleAsc                          // Сортировка по заголовку (по возрастанию)
	ComplexHouseSortTitleDesc                         // Сортировка по заголовку (по убыванию)
	ComplexHouseSortCreatedAtAsc
	ComplexHouseSortCreatedAtDesc
)

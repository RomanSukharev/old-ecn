package estate_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр ЖК
type ComplexFilter struct {
	DeveloperID       *string                          // Идентификатор застройщика
	IsDeleted         *bool                            // Признак удаления
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации
	WithPhotos        *bool                            // С фотографиями
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type ComplexSort int // Сортировка ЖК

const (
	ComplexSortDefault   ComplexSort = iota // Сортировка по умолчанию (не задана)
	ComplexSortTitleAsc                     // Сортировка по заголовку (по возрастанию)
	ComplexSortTitleDesc                    // Сортировка по заголовку (по убыванию)
	ComplexSortCreatedAtAsc
	ComplexSortCreatedAtDesc
)

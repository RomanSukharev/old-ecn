package estate_entity

import shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"

// Фильтр КП
type VillageFilter struct {
	DeveloperID       *string                          // Застройщик
	IsDeleted         *bool                            // Признак удаления
	PublicationStatus *shared_entity.PublicationStatus // Статус публикации
	WithPhotos        *bool                            // С фотографиями
	Keyword           *string                          // Ключевое слово для полнотекстового поиска
}

type VillageSort int // Сортировка КП

const (
	VillageSortDefault   VillageSort = iota // Сортировка по умолчанию (не задана)
	VillageSortTitleAsc                     // Сортировка по заголовку (по возрастанию)
	VillageSortTitleDesc                    // Сортировка по заголовку (по убыванию)
)

package estate_entity

// Фильтр застройщиков
type DeveloperFilter struct {
	IsDeleted *bool   // Признак удаления
	Keyword   *string // Ключевое слово для полнотекстового поиска
}

type DeveloperSort int // Сортировка застройщиков

const (
	DeveloperSortDefault   DeveloperSort = iota // Сортировка по умолчанию (не задана)
	DeveloperSortTitleAsc                       // Сортировка по заголовку (по возрастанию)
	DeveloperSortTitleDesc                      // Сортировка по заголовку (по убыванию)
)

package staff_entity

// Фильтр должностей
type PositionFilter struct {
	Keyword *string // Ключевое слово для полнотекстового поиска
}

type PositionSort int

const (
	PositionSortDefault PositionSort = iota
	PositionSortTitleAsc
	PositionSortTitleDesc
)

package staff_entity

// Фильтр отделов
type DepartmentFilter struct {
	Keyword *string // Ключевые слова для полнотекстового поиска
}

type DepartmentSort int

const (
	DepartmentSortDefault DepartmentSort = iota
	DepartmentSortTitleAsc
	DepartmentSortTitleDesc
)

package staff_entity

// Фильтр групп внутри отделов
type DepartmentGroupFilter struct {
	DepartmentID *string // Идентификатор родительского отдела
	Keyword      *string // Ключевые слова для полнотекстового поиска
}

type DepartmentGroupSort int

const (
	DepartmentGroupSortDefault DepartmentGroupSort = iota
	DepartmentGroupSortTitleAsc
	DepartmentGroupSortTitleDesc
)

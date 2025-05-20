package staff_entity

// Фильтр сотрудников
type EmployeeFilter struct {
	DepartmentID *string // Идентификатор отдела
	GroupID      *string // Идентификатор группы внутри отдела
	RoleID       *string // Идентификатор роли
	IsActive     *bool   // Признак активности
	IsPublished  *bool   // Признак публикации на сайте
	IsDeleted    *bool   // Признак удаления
	Keyword      *string // Ключевое слово для полнотекстового поиска
}

type EmployeeSort int

const (
	EmployeeSortDefault EmployeeSort = iota
	EmployeeSortSurnameAsc
	EmployeeSortSurnameDesc
	EmployeeSortCreatedAtAsc
	EmployeeSortCreatedAtDesc
)

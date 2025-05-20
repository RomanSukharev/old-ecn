package staff_entity

// Фильтр ролей
type RoleFilter struct {
	Keyword *string // Ключевое слово для полнотекстового поиска
}

type RoleSort int

const (
	RoleSortDefault RoleSort = iota
	RoleSortTitleAsc
	RoleSortTitleDesc
)

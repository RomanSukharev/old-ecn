package staff_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Группа внутри отдела
type DepartmentGroup struct {
	shared_entity.BaseDocument
	DepartmentID *string // Идентификатор родительского отдела
	ChiefID      *string // Идентификатор сотрудника-руководителя группы
	Title        string  // Название группы
}

type DepartmentGroups []DepartmentGroup
type DepartmentGroupPtrs []*DepartmentGroup

package staff_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Отдел
type Department struct {
	shared_entity.BaseDocument
	ChiefID *string          // Идентификатор сотрудника-руководителя отдела
	Title   string           // Название отдела
	Groups  DepartmentGroups // Упорядоченный массив групп внутри отдела
}

type Departments []Department
type DepartmentPtrs []*Department

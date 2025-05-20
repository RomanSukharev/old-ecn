package staff_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Должность
type Position struct {
	shared_entity.BaseDocument
	Title string // Название
}

type Positions []Position
type PositionPtrs []*Position

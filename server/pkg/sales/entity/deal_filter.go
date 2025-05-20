package sales_entity

import (
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
)

type DealFilter struct {
	Keyword       *string
	Phone         *string
	Employee      *string
	Contact       *string
	Type          *DealType
	Stage         *DealStage
	Deal          *string
	PropertyType  *estate_entity.PropertyType
	IsDeleted     *bool
	CreatedAtMin  time.Time
	CreatedAtMax  time.Time
	FinishedAtMin time.Time
	FinishedAtMax time.Time
}

type DealSort int

const (
	DealSortDeafult DealSort = iota
	DealSortCreatedAtAsc
	DealSortCreatedAtDesc
)

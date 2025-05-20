package system_repository

import (
	"context"

	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
)

type ILogDataRepository interface {
	Search(ctx context.Context, skip *int, limit *int, sort system_entity.LogSort, filter *system_entity.LogFilter) (data []*system_entity.Log, total int, error error)
	GetByID(ctx context.Context, id string) (*system_entity.Log, error)
	Create(ctx context.Context, input system_entity.Log) error
}

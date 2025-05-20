package system_service

import (
	"context"

	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
)

type ISystemService interface {
	SaveLog(ctx context.Context, input system_entity.Log) error
	SearchLogs(ctx context.Context, skip *int, limit *int, sort system_entity.LogSort, filter *system_entity.LogFilter) (data []*system_entity.Log, total int, error error)
}

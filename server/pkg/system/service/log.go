package system_service

import (
	"context"
	"log/slog"
	"time"

	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
)

func (s *systemService) SearchLogs(ctx context.Context, skip *int, limit *int, sort system_entity.LogSort, filter *system_entity.LogFilter) ([]*system_entity.Log, int, error) {
	return s.logDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *systemService) SaveLog(ctx context.Context, input system_entity.Log) error {

	input.CreatedAt = time.Now()
	input.UpdatedAt = input.CreatedAt

	return s.logDataRepo.Create(ctx, input)
}

func (s *systemService) readSystemLog() {
	for log := range s.systemLog {
		if err := s.SaveLog(context.Background(), log); err != nil {
			slog.Error("[systemService.readSystemLog] s.SaveLog error", err)
		}
	}
}

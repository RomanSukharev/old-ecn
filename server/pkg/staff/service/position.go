package staff_service

import (
	"context"
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *staffService) SearchPositions(ctx context.Context, skip *int, limit *int, sort staff_entity.PositionSort, filter *staff_entity.PositionFilter) ([]*staff_entity.Position, int, error) {
	return s.positionDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *staffService) GetPositionByID(ctx context.Context, id string) (*staff_entity.Position, error) {
	return s.positionDataRepo.GetByID(ctx, id)
}

func (s *staffService) SavePosition(ctx context.Context, input staff_entity.Position) (*staff_entity.Position, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt

		position, err := s.positionDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffPositionCreate, nil, &userID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffPositionCreate, shared_entity.StatusCodeStaffPositionCreateOK, &userID, &position.ID)
		return position, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		position, err := s.positionDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffPositionUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffPositionUpdate, shared_entity.StatusCodeStaffPositionDeleteOK, &userID, &position.ID)
		return position, nil
	}
}

func (s *staffService) DeletePosition(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.positionDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeStaffPositionDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeStaffPositionDelete, shared_entity.StatusCodeStaffPositionDeleteOK, &userID, &id)
	return nil
}

func (s *staffService) BulkDeletePositions(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.positionDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeStaffPositionsDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffPositionsDelete, shared_entity.StatusCodeStaffPositionBulkDeleteOK, &userID, ids)
	return nil
}

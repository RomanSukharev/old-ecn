package sales_service

import (
	"context"
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *salesService) SearchMeets(ctx context.Context, skip *int, limit *int, sort sales_entity.MeetSort, filter *sales_entity.MeetFilter) ([]*sales_entity.Meet, int, error) {
	return s.meetsDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *salesService) GetMeetByID(ctx context.Context, id string) (*sales_entity.Meet, error) {
	return s.meetsDataRepo.GetByID(ctx, id)
}

func (s *salesService) SaveMeet(ctx context.Context, input sales_entity.Meet) (*sales_entity.Meet, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		maxInternalNumber, err := s.meetsDataRepo.GetNextInternalNumber(ctx)
		if err != nil {
			return nil, err
		}
		input.InternalNumber = utils.Pointer(maxInternalNumber)

		meet, err := s.meetsDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesMeetCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesMeetCreate, shared_entity.StatusCodeSalesMeetCreateOK, &userID, &meet.ID)
		return meet, nil

	} else {
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		meet, err := s.meetsDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesMeetUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesMeetUpdate, shared_entity.StatusCodeSalesMeetUpdateOK, &userID, &input.ID)
		return meet, nil
	}
}

func (s *salesService) DeleteMeet(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.meetsDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeSalesMeetDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesMeetDelete, shared_entity.StatusCodeSalesMeetDeleteOK, &userID, &id)
	return nil
}

func (s *salesService) ChangeMeetStatus(ctx context.Context, id string, status string) error {

	userID := utils.GetUserID(ctx)

	if err := s.meetsDataRepo.ChangeStatus(ctx, id, status); err != nil {
		s.logError(system_entity.LogTypeSalesMeetChangeStatus, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesMeetChangeStatus, shared_entity.StatusCodeSalesMeetChangeStatusOK, &userID, &id)
	return nil
}

func (s *salesService) BulkDeleteMeets(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.meetsDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeSalesMeetsDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesMeetsDelete, shared_entity.StatusCodeSalesMeetBulkDeleteOK, &userID, ids)
	return nil
}

func (s *salesService) BulkChangeMeetStatus(ctx context.Context, ids []string, status string) error {

	userID := utils.GetUserID(ctx)

	if err := s.meetsDataRepo.BulkChangeStatus(ctx, ids, status); err != nil {
		s.logsError(system_entity.LogTypeSalesMeetsChangeStatus, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesMeetsChangeStatus, shared_entity.StatusCodeSalesMeetBulkChangeStatusOK, &userID, ids)
	return nil
}

package sales_service

import (
	"context"
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *salesService) SearchMortgageRequests(ctx context.Context, skip *int, limit *int, sort sales_entity.MortgageRequestSort, filter *sales_entity.MortgageRequestFilter) ([]*sales_entity.MortgageRequest, int, error) {
	return s.mortgageRequestsDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *salesService) GetMortgageRequestByID(ctx context.Context, id string) (*sales_entity.MortgageRequest, error) {
	return s.mortgageRequestsDataRepo.GetByID(ctx, id)
}

func (s *salesService) SaveMortgageRequest(ctx context.Context, input sales_entity.MortgageRequest) (*sales_entity.MortgageRequest, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		maxInternalNumber, err := s.mortgageRequestsDataRepo.GetNextInternalNumber(ctx)
		if err != nil {
			return nil, err
		}
		input.InternalNumber = utils.Pointer(maxInternalNumber)

		mortgageRequest, err := s.mortgageRequestsDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesMortgageRequestCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(
			system_entity.LogTypeSalesMortgageRequestCreate,
			shared_entity.StatusCodeSalesMortgageRequestCreateOK,
			&userID,
			&mortgageRequest.ID)

		return mortgageRequest, nil

	} else {
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		mortgageRequest, err := s.mortgageRequestsDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesMortgageRequestUpdate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(
			system_entity.LogTypeSalesMortgageRequestUpdate,
			shared_entity.StatusCodeSalesMortgageRequestUpdateOK,
			&userID,
			&input.ID)

		return mortgageRequest, nil
	}
}

func (s *salesService) DeleteMortgageRequest(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.mortgageRequestsDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeSalesMortgageRequestDelete, &userID, &id, err)
		return err
	}

	s.logInfo(
		system_entity.LogTypeSalesMortgageRequestDelete,
		shared_entity.StatusCodeSalesMortgageRequestDeleteOK,
		&userID,
		&id)
	return nil
}

func (s *salesService) ChangeMortgageRequestStatus(ctx context.Context, id string, status string) error {

	userID := utils.GetUserID(ctx)

	if err := s.mortgageRequestsDataRepo.ChangeStatus(ctx, id, status); err != nil {
		s.logError(system_entity.LogTypeSalesMortgageRequestDelete, &userID, nil, err)
		return err
	}

	s.logInfo(
		system_entity.LogTypeSalesMortgageRequestDelete,
		shared_entity.StatusCodeSalesMortgageRequestChangeStatusOK,
		&userID,
		&id)
	return nil
}

func (s *salesService) BulkDeleteMortgageRequests(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.mortgageRequestsDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeSalesMortgageRequestsDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(
		system_entity.LogTypeSalesMortgageRequestsDelete,
		shared_entity.StatusCodeSalesMortgageRequestBulkDeleteOK,
		&userID,
		ids)
	return nil
}

func (s *salesService) BulkChangeMortgageRequestsStatus(ctx context.Context, ids []string, status string) error {

	userID := utils.GetUserID(ctx)

	if err := s.mortgageRequestsDataRepo.BulkChangeStatus(ctx, ids, status); err != nil {
		s.logsError(system_entity.LogTypeSalesMortgageRequestsChangeStatus, &userID, ids, err)
		return err
	}

	s.logsInfo(
		system_entity.LogTypeSalesMortgageRequestsChangeStatus,
		shared_entity.StatusCodeSalesMortgageRequestBulkChangeStatusOK,
		&userID,
		ids)
	return nil
}

package sales_service

import (
	"context"
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *salesService) SearchLeads(ctx context.Context, skip *int, limit *int, sort sales_entity.LeadSort, filter *sales_entity.LeadFilter) ([]*sales_entity.Lead, int, error) {
	return s.leadsDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *salesService) GetLeadByID(ctx context.Context, id string) (*sales_entity.Lead, error) {
	return s.leadsDataRepo.GetByID(ctx, id)
}

func (s *salesService) SaveLead(ctx context.Context, input sales_entity.Lead) (*sales_entity.Lead, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		maxInternalNumber, err := s.leadsDataRepo.GetNextInternalNumber(ctx)
		if err != nil {
			return nil, err
		}
		input.InternalNumber = utils.Pointer(maxInternalNumber)

		lead, err := s.leadsDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesLeadCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesLeadCreate, shared_entity.StatusCodeSalesLeadCreateOK, &userID, &lead.ID)
		return lead, nil

	} else {
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		lead, err := s.leadsDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesLeadUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesLeadUpdate, shared_entity.StatusCodeSalesLeadUpdateOK, &userID, &input.ID)
		return lead, nil
	}
}

func (s *salesService) DeleteLead(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.leadsDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeSalesLeadDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesLeadDelete, shared_entity.StatusCodeSalesLeadDeleteOK, &userID, &id)
	return nil
}

func (s *salesService) ChangeLeadStatus(ctx context.Context, id string, status string, comment *string) error {

	userID := utils.GetUserID(ctx)

	if err := s.leadsDataRepo.ChangeStatus(ctx, id, status, comment); err != nil {
		s.logError(system_entity.LogTypeSalesLeadChangeStatus, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesLeadChangeStatus, shared_entity.StatusCodeSalesLeadChangeStatusOK, &userID, &id)
	return nil
}

func (s *salesService) BulkDeleteLeads(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.leadsDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeSalesLeadsDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesLeadsDelete, shared_entity.StatusCodeSalesLeadBulkDeleteOK, &userID, ids)
	return nil
}

func (s *salesService) BulkChangeLeadsStatus(ctx context.Context, ids []string, status string, comment *string) error {

	userID := utils.GetUserID(ctx)

	if err := s.leadsDataRepo.BulkChangeStatus(ctx, ids, status, comment); err != nil {
		s.logsError(system_entity.LogTypeSalesLeadsChangeStatus, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesLeadsChangeStatus, shared_entity.StatusCodeSalesLeadBulkChangeStatusOK, &userID, ids)
	return nil
}

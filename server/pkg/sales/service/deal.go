package sales_service

import (
	"context"
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *salesService) SearchDeals(ctx context.Context, skip *int, limit *int, sort sales_entity.DealSort, filter *sales_entity.DealFilter) ([]*sales_entity.Deal, int, error) {
	deals, total, err := s.dealsDataRepo.Search(ctx, skip, limit, sort, filter)
	if err != nil {
		return nil, 0, err
	}

	if filter != nil && filter.PropertyType != nil {
		propertyFilter := &estate_entity.PropertyFilter{Type: filter.PropertyType}
		properties, total, err := s.propertiesDataRepo.Search(ctx, nil, nil, estate_entity.PropertySortDefault, propertyFilter)
		if err != nil {
			return nil, 0, err
		}

		if total == 0 {
			return []*sales_entity.Deal{}, 0, nil
		}

		dealsByPropertyType := make([]*sales_entity.Deal, 0, len(deals))
		propertiesID := make(map[string]bool)

		for _, property := range properties {
			propertiesID[property.ID] = true
		}

		for _, deal := range deals {
			if deal.Property != nil && propertiesID[*deal.Property] {
				dealsByPropertyType = append(dealsByPropertyType, deal)
			}
		}
		return dealsByPropertyType, len(dealsByPropertyType), nil
	}
	return deals, total, nil
}

func (s *salesService) GetDealByID(ctx context.Context, id string) (*sales_entity.Deal, error) {
	return s.dealsDataRepo.GetByID(ctx, id)
}

func (s *salesService) SaveDeal(ctx context.Context, input sales_entity.Deal) (*sales_entity.Deal, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		maxInternalNumber, err := s.dealsDataRepo.GetNextInternalNumber(ctx)
		if err != nil {
			return nil, err
		}
		input.InternalNumber = utils.Pointer(maxInternalNumber)

		deal, err := s.dealsDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesDealCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesDealCreate, shared_entity.StatusCodeSalesDealCreateOK, &userID, &deal.ID)
		return deal, nil

	} else {
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		deal, err := s.dealsDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesDealUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesDealUpdate, shared_entity.StatusCodeSalesDealUpdateOK, &userID, &input.ID)
		return deal, nil
	}
}

func (s *salesService) DeleteDeal(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.dealsDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeSalesDealDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesDealDelete, shared_entity.StatusCodeSalesDealDeleteOK, &userID, &id)
	return nil
}

func (s *salesService) ChangeDealStage(ctx context.Context, id string, stage string) error {

	userID := utils.GetUserID(ctx)

	if err := s.dealsDataRepo.ChangeStage(ctx, id, stage); err != nil {
		s.logError(system_entity.LogTypeSalesDealChangeStage, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesDealChangeStage, shared_entity.StatusCodeSalesDealChangeStageOK, &userID, &id)
	return nil
}

func (s *salesService) BulkDeleteDeals(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.dealsDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeSalesDealsDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesDealsDelete, shared_entity.StatusCodeSalesDealBulkDeleteOK, &userID, ids)
	return nil
}

func (s *salesService) BulkChangeDealsStage(ctx context.Context, ids []string, stage string) error {

	userID := utils.GetUserID(ctx)

	if err := s.dealsDataRepo.BulkChangeStage(ctx, ids, stage); err != nil {
		s.logsError(system_entity.LogTypeSalesDealsChangeStage, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesDealsChangeStage, shared_entity.StatusCodeSalesDealBulkChangeStageOK, &userID, ids)
	return nil
}

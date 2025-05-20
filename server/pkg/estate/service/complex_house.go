package estate_service

import (
	"context"
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *estateService) SearchComplexHouses(ctx context.Context, skip *int, limit *int, sort estate_entity.ComplexHouseSort, filter *estate_entity.ComplexHouseFilter) ([]*estate_entity.ComplexHouse, int, error) {
	return s.complexHouseDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *estateService) GetComplexHouseByID(ctx context.Context, id string) (*estate_entity.ComplexHouse, error) {
	return s.complexHouseDataRepo.GetByID(ctx, id)
}

func (s *estateService) SaveComplexHouse(ctx context.Context, input estate_entity.ComplexHouse) (*estate_entity.ComplexHouse, error) {

	userID := utils.GetUserID(ctx)

	if input.IsReady != nil && *input.IsReady {
		input.ReadinessQuarter = utils.Pointer(estate_entity.QuarterUnset)
	}

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		complexHouse, err := s.complexHouseDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateComplexHouseCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateComplexHouseCreate, shared_entity.StatusCodeEstateComplexHouseCreateOK, &userID, &complexHouse.ID)
		return complexHouse, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		complexHouse, err := s.complexHouseDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateComplexHouseUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateComplexHouseUpdate, shared_entity.StatusCodeEstateComplexHouseUpdateOK, &userID, &input.ID)
		return complexHouse, nil
	}
}

func (s *estateService) DeleteComplexHouse(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.complexHouseDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeEstateComplexHouseDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeEstateComplexHouseDelete, shared_entity.StatusCodeEstateComplexHouseDeleteOK, &userID, &id)
	return nil
}

func (s *estateService) BulkDeleteComplexHouses(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.complexHouseDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeEstateComplexHousesDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeEstateComplexHousesDelete, shared_entity.StatusCodeEstateComplexHouseBulkDeleteOK, &userID, ids)
	return nil
}

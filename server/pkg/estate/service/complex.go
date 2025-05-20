package estate_service

import (
	"context"
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *estateService) SearchComplexes(ctx context.Context, skip *int, limit *int, sort estate_entity.ComplexSort, filter *estate_entity.ComplexFilter) ([]*estate_entity.Complex, int, error) {
	return s.complexDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *estateService) GetComplexByID(ctx context.Context, id string) (*estate_entity.Complex, error) {
	return s.complexDataRepo.GetByID(ctx, id)
}

func (s *estateService) SaveComplex(ctx context.Context, input estate_entity.Complex) (*estate_entity.Complex, error) {

	userID := utils.GetUserID(ctx)

	if input.InCity != nil && *input.InCity {
		input.CityDistance = utils.Pointer(0)
	}

	if input.InCity != nil && !*input.InCity {
		input.Region = utils.Pointer("")
		input.SubRegion = utils.Pointer("")
	}

	if input.IsReady != nil && *input.IsReady {
		input.ReadinessQuarter = utils.Pointer(estate_entity.QuarterUnset)
	}

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		complex, err := s.complexDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateComplexCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateComplexCreate, shared_entity.StatusCodeEstateComplexCreateOK, &userID, &complex.ID)
		return complex, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		complex, err := s.complexDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateComplexUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateComplexUpdate, shared_entity.StatusCodeEstateComplexUpdateOK, &userID, &input.ID)
		return complex, nil
	}
}

func (s *estateService) DeleteComplex(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.complexDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeEstateComplexDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeEstateComplexDelete, shared_entity.StatusCodeEstateComplexDeleteOK, &userID, &id)
	return nil
}

func (s *estateService) BulkDeleteComplexes(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.complexDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeEstateComplexesDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeEstateComplexesDelete, shared_entity.StatusCodeEstateComplexBulkDeleteOK, &userID, ids)
	return nil
}

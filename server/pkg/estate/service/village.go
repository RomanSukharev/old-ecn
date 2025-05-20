package estate_service

import (
	"context"
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *estateService) SearchVillages(ctx context.Context, skip *int, limit *int, sort estate_entity.VillageSort, filter *estate_entity.VillageFilter) ([]*estate_entity.Village, int, error) {
	return s.villageDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *estateService) GetVillageByID(ctx context.Context, id string) (*estate_entity.Village, error) {
	return s.villageDataRepo.GetByID(ctx, id)
}

func (s *estateService) SaveVillage(ctx context.Context, input estate_entity.Village) (*estate_entity.Village, error) {

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

		village, err := s.villageDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateVillageCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateVillageCreate, shared_entity.StatusCodeEstateVillageCreateOK, &userID, &village.ID)
		return village, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		village, err := s.villageDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateVillageUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateVillageUpdate, shared_entity.StatusCodeEstateVillageUpdateOK, &userID, &input.ID)
		return village, nil
	}
}

func (s *estateService) DeleteVillage(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.villageDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeEstateVillageDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeEstateVillageDelete, shared_entity.StatusCodeEstateVillageDeleteOK, &userID, &id)
	return nil
}

func (s *estateService) BulkDeleteVillages(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.villageDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeEstateVillagesDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeEstateVillagesDelete, shared_entity.StatusCodeEstateVillageBulkDeleteOK, &userID, ids)
	return nil
}

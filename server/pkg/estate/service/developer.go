package estate_service

import (
	"context"
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *estateService) SearchDevelopers(ctx context.Context, skip *int, limit *int, sort estate_entity.DeveloperSort, filter *estate_entity.DeveloperFilter) ([]*estate_entity.Developer, int, error) {
	return s.developerDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *estateService) GetDeveloperByID(ctx context.Context, id string) (*estate_entity.Developer, error) {
	return s.developerDataRepo.GetByID(ctx, id)
}

func (s *estateService) SaveDeveloper(ctx context.Context, input estate_entity.Developer) (*estate_entity.Developer, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		developer, err := s.developerDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateDeveloperCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateDeveloperCreate, shared_entity.StatusCodeEstateDeveloperCreateOK, &userID, &developer.ID)
		return developer, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		developer, err := s.developerDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstateDeveloperUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstateDeveloperUpdate, shared_entity.StatusCodeEstateDeveloperUpdateOK, &userID, &input.ID)
		return developer, nil
	}
}

func (s *estateService) DeleteDeveloper(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.developerDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeEstateDeveloperDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeEstateDeveloperDelete, shared_entity.StatusCodeEstateDeveloperDeleteOK, &userID, &id)
	return nil
}

func (s *estateService) BulkDeleteDevelopers(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.developerDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeEstateDevelopersDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeEstateDevelopersDelete, shared_entity.StatusCodeEstateDeveloperBulkDeleteOK, &userID, ids)
	return nil
}

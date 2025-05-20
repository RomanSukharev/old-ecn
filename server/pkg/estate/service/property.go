package estate_service

import (
	"context"
	"log/slog"
	"time"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

const (
	refreshTimer = time.Duration(time.Hour * 24)
	longRefresh  = 110 * 24
	shortRefresh = 28 * 24
)

func (s *estateService) SearchProperties(ctx context.Context, skip *int, limit *int, sort estate_entity.PropertySort, filter *estate_entity.PropertyFilter) ([]*estate_entity.Property, int, error) {
	return s.propertyDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *estateService) GetPropertyByID(ctx context.Context, id string) (*estate_entity.Property, error) {
	return s.propertyDataRepo.GetByID(ctx, id)
}

func (s *estateService) SaveProperty(ctx context.Context, input estate_entity.Property) (*estate_entity.Property, error) {

	userID := utils.GetUserID(ctx)

	if input.InComplex != nil && !*input.InComplex {
		input.ComplexID = utils.Pointer("")
	}

	if input.InVillage != nil && !*input.InVillage {
		input.VillageID = utils.Pointer("")
	}

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

	if input.Price != nil && *input.Price != 0 {
		if input.Area != nil && *input.Area != 0 {
			pricePerMeter := *input.Price / *input.Area
			input.PricePerMeter = &pricePerMeter
		}

		if input.LandArea != nil && *input.LandArea != 0 {
			pricePerAr := *input.Price / *input.LandArea
			input.PricePerAr = &pricePerAr
		}

		if input.ComissionPercent != nil && *input.ComissionPercent != 0 {
			if input.ComissionAmount == nil || *input.ComissionAmount == 0 {
				amount := *input.Price / 100 * (*input.ComissionPercent)
				input.ComissionAmount = &amount
			}
		}
		input.PriceHistory = append(input.PriceHistory, *input.Price)
	}

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.RefreshDate = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)
		input.IsEditable = utils.Pointer(true)

		property, err := s.propertyDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstatePropertyCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeEstatePropertyCreate, shared_entity.StatusCodeEstatePropertyCreateOK, &userID, &property.ID)
		return property, nil
	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		oldProperty, err := s.propertyDataRepo.GetByID(ctx, input.ID)
		if err != nil {
			return nil, err
		}
		oldLenPriceHistory := len(oldProperty.PriceHistory)

		input = s.updatePriceHistory(*oldProperty, input)

		property, err := s.propertyDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeEstatePropertyUpdate, &userID, &input.ID, err)
			return nil, err
		}

		newLenPriceHistory := len(property.PriceHistory)

		if newLenPriceHistory != oldLenPriceHistory {
			s.logInfo(
				system_entity.LogTypeEstatePropertyUpdatePriceHistory,
				shared_entity.StatusCodeEstatePropertyUpdatePriceHistoryOK,
				&userID,
				&input.ID)
		}

		s.logInfo(
			system_entity.LogTypeEstatePropertyUpdate,
			shared_entity.StatusCodeEstatePropertyUpdateOK,
			&userID,
			&input.ID)

		return property, nil
	}
}

func (s *estateService) updatePriceHistory(oldProperty estate_entity.Property, input estate_entity.Property) estate_entity.Property {

	if input.Price == nil {
		return input
	}

	if oldProperty.Price == nil {
		oldProperty.PriceHistory = append(oldProperty.PriceHistory, *input.Price)
		input.PriceHistory = make([]float64, len(oldProperty.PriceHistory))
		copy(input.PriceHistory, oldProperty.PriceHistory)

	} else if *oldProperty.Price != *input.Price {
		oldProperty.PriceHistory = append(oldProperty.PriceHistory, *input.Price)
		input.PriceHistory = make([]float64, len(oldProperty.PriceHistory))
		copy(input.PriceHistory, oldProperty.PriceHistory)
	}
	return input
}

func (s *estateService) DeleteProperty(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.propertyDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeEstatePropertyDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeEstatePropertyDelete, shared_entity.StatusCodeEstatePropertyDeleteOK, &userID, &id)
	return nil
}

func (s *estateService) ChangePropertyStatus(ctx context.Context, id string, status estate_entity.PropertyStatus) error {

	userID := utils.GetUserID(ctx)

	if err := s.propertyDataRepo.ChangeStatus(ctx, id, status); err != nil {
		s.logError(system_entity.LogTypeEstatePropertyChangeStatus, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeEstatePropertyChangeStatus, shared_entity.StatusCodeEstatePropertyChangeStatusOK, &userID, &id)
	return nil
}

func (s *estateService) RefreshProperty(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.propertyDataRepo.Refresh(ctx, id); err != nil {
		s.logError(system_entity.LogTypeEstatePropertyDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeEstatePropertyRefresh, shared_entity.StatusCodeEstatePropertyRefreshOK, &userID, &id)
	return nil
}

func (s *estateService) BulkDeleteProperties(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.propertyDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeEstatePropertiesDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeEstatePropertiesDelete, shared_entity.StatusCodeEstatePropertyBulkDeleteOK, &userID, ids)
	return nil
}

func (s *estateService) BulkChangePropertiesStatus(ctx context.Context, ids []string, status estate_entity.PropertyStatus) error {

	userID := utils.GetUserID(ctx)

	if err := s.propertyDataRepo.BulkChangeStatus(ctx, ids, status); err != nil {
		s.logsError(system_entity.LogTypeEstatePropertiesChangeStatus, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeEstatePropertiesChangeStatus, shared_entity.StatusCodeEstatePropertyBulkChangeStatusOK, &userID, ids)
	return nil
}

func (s *estateService) BulkRefreshProperties(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.propertyDataRepo.BulkRefresh(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeEstatePropertiesRefresh, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeEstatePropertiesRefresh, shared_entity.StatusCodeEstatePropertyBulkRefreshOK, &userID, ids)
	return nil
}

func (s *estateService) checkRefreshProperties() {
	ticker := time.NewTicker(refreshTimer)
	defer ticker.Stop()

	for {
		ctx := context.Background()

		select {
		case <-ticker.C:
			properties, totalCount, err := s.propertyDataRepo.Search(ctx, nil, nil, estate_entity.PropertySortDefault, nil)
			if err != nil {
				continue
			}

			if totalCount == 0 {
				slog.Info("[estateService.checkRefreshProperties] there are no properties in the database")
				continue
			}

			for _, property := range properties {
				duration := time.Since(property.RefreshDate)

				if duration.Hours() >= longRefresh {
					if err := s.propertyDataRepo.Delete(ctx, property.ID); err != nil {
						//TODO: error log event
						continue
					}
					//TODO: info log event
					continue
				}

				if duration.Hours() >= shortRefresh && *property.IsEditable {
					property.IsEditable = utils.Pointer(false)
					_, err := s.propertyDataRepo.Update(ctx, property.ID, *property)
					if err != nil {
						//TODO: error log event
						continue
					}
					//TODO: info log event
				}
			}

		case <-ctx.Done():
			return
		}
	}
}

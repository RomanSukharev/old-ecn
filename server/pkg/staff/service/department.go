package staff_service

import (
	"context"
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *staffService) SearchDepartments(ctx context.Context, skip *int, limit *int, sort staff_entity.DepartmentSort, filter *staff_entity.DepartmentFilter) ([]*staff_entity.Department, int, error) {
	return s.departmentDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *staffService) GetDepartmentByID(ctx context.Context, id string) (*staff_entity.Department, error) {
	return s.departmentDataRepo.GetByID(ctx, id)
}

func (s *staffService) SaveDepartment(ctx context.Context, input staff_entity.Department) (*staff_entity.Department, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt

		department, err := s.departmentDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffDepartmentCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffDepartmentCreate, shared_entity.StatusCodeStaffDepartmentCreateOK, &userID, &department.ID)
		return department, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		department, err := s.departmentDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffDepartmentUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffDepartmentUpdate, shared_entity.StatusCodeStaffDepartmentUpdateOK, &userID, &department.ID)
		return department, nil
	}
}

func (s *staffService) DeleteDepartment(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.departmentDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeStaffDepartmentDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeStaffDepartmentDelete, shared_entity.StatusCodeStaffDepartmentDeleteOK, &userID, &id)
	return nil
}

func (s *staffService) BulkDeleteDepartments(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.departmentDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeStaffDepartmentsDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffDepartmentsDelete, shared_entity.StatusCodeStaffDepartmentBulkDeleteOK, &userID, ids)
	return nil
}

package staff_service

import (
	"context"
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *staffService) SearchRoles(ctx context.Context, skip *int, limit *int, sort staff_entity.RoleSort, filter *staff_entity.RoleFilter) ([]*staff_entity.Role, int, error) {
	return s.roleDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *staffService) GetRoleByID(ctx context.Context, id string) (*staff_entity.Role, error) {
	return s.roleDataRepo.GetByID(ctx, id)
}

func (s *staffService) SaveRole(ctx context.Context, input staff_entity.Role) (*staff_entity.Role, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt

		role, err := s.roleDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffRoleCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffRoleCreate, shared_entity.StatusCodeStaffRoleCreateOK, &userID, &role.ID)
		return role, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		role, err := s.roleDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffRoleUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffRoleUpdate, shared_entity.StatusCodeStaffRoleUpdateOK, &userID, &role.ID)
		return role, nil
	}
}

func (s *staffService) DeleteRole(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.roleDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeStaffRoleDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeStaffRoleDelete, shared_entity.StatusCodeStaffRoleDeleteOK, &userID, &id)
	return nil
}

func (s *staffService) BulkDeleteRoles(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.roleDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeStaffRolesDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffRolesDelete, shared_entity.StatusCodeStaffRoleBulkDeleteOK, &userID, ids)
	return nil
}

package staff_service

import (
	"context"
	"time"

	"github.com/pinks-agency/ecn/server/pkg/errs"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *staffService) SearchEmployees(ctx context.Context, skip *int, limit *int, sort staff_entity.EmployeeSort, filter *staff_entity.EmployeeFilter) ([]*staff_entity.Employee, int, error) {
	return s.employeeDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *staffService) GetEmployeeByID(ctx context.Context, id string) (*staff_entity.Employee, error) {
	employee, err := s.employeeDataRepo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	if employee.RoleID != nil {
		role, err := s.roleDataRepo.GetByID(ctx, *employee.RoleID)
		if err == nil {
			employee.Permissions = role.Permissions
		}
	}

	return employee, nil
}

func (s *staffService) GetEmployeeByEmail(ctx context.Context, id string) (*staff_entity.Employee, error) {
	return s.employeeDataRepo.GetByEmail(ctx, id)
}

func (s *staffService) Login(ctx context.Context, email string, password string) (*staff_entity.Employee, string, error) {

	employee, err := s.employeeDataRepo.GetByEmail(ctx, email)
	if err != nil {
		s.logError(system_entity.LogTypeAuthLogin, nil, nil, err)
		return nil, "", err
	}

	if err := employee.VerifyPassword(password); err != nil {
		s.logError(system_entity.LogTypeAuthLogin, &employee.ID, nil, err)
		return nil, "", err
	}

	if employee.RoleID != nil {
		role, err := s.roleDataRepo.GetByID(ctx, *employee.RoleID)
		if err == nil {
			employee.Permissions = role.Permissions
		}
	}

	token, err := utils.CreateToken(time.Hour*24, &utils.AuthPayload{
		UserId:      employee.ID,
		Permissions: employee.Permissions.String(),
	})
	if err != nil {
		s.logError(system_entity.LogTypeAuthLogin, &employee.ID, nil, errs.ErrCreateToken)
		return nil, "", errs.ErrCreateToken
	}

	s.logInfo(system_entity.LogTypeAuthLogin, shared_entity.StatusCodeStaffLoginOK, &employee.ID, nil)
	return employee, token, nil
}

func (s *staffService) Logout(ctx context.Context) error {

	userID := utils.GetUserID(ctx)

	s.logInfo(system_entity.LogTypeAuthLogout, shared_entity.StatusCodeStaffLogoutOK, &userID, nil)
	return nil
}

func (s *staffService) SaveEmployee(ctx context.Context, input staff_entity.Employee) (*staff_entity.Employee, error) {

	userID := utils.GetUserID(ctx)

	if input.Password != "" {
		input.SetPassword(input.Password)
	}

	if input.ID == "" {
		// Handle create
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt

		employee, err := s.employeeDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffEmployeeCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffEmployeeCreate, shared_entity.StatusCodeStaffEmployeeCreateOK, &userID, &employee.ID)
		return employee, nil

	} else {
		// Handle update
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		employee, err := s.employeeDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeStaffEmployeeUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeStaffEmployeeUpdate, shared_entity.StatusCodeStaffEmployeeUpdateOK, &userID, &input.ID)
		return employee, nil
	}
}

func (s *staffService) DeleteEmployee(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.employeeDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeStaffEmployeeDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeStaffEmployeeDelete, shared_entity.StatusCodeStaffEmployeeDeleteOK, &userID, &id)
	return nil
}

func (s *staffService) BulkDeleteEmployees(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.employeeDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeStaffEmployeesDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffEmployeesDelete, shared_entity.StatusCodeStaffEmployeeBulkDeleteOK, &userID, ids)
	return nil
}

func (s *staffService) BulkActivateEmployees(ctx context.Context, ids []string, state bool) error {

	userID := utils.GetUserID(ctx)

	if err := s.employeeDataRepo.BulkActivate(ctx, ids, state); err != nil {
		s.logsError(system_entity.LogTypeStaffEmployeesActivate, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffEmployeesActivate, shared_entity.StatusCodeStaffEmployeeBulkActivateOK, &userID, ids)
	return nil
}

func (s *staffService) BulkPublishEmployees(ctx context.Context, ids []string, state bool) error {

	userID := utils.GetUserID(ctx)

	if err := s.employeeDataRepo.BulkPublish(ctx, ids, state); err != nil {
		s.logsError(system_entity.LogTypeStaffEmployeesPublish, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffEmployeesPublish, shared_entity.StatusCodeStaffEmployeeBulkPublishOK, &userID, ids)
	return nil
}

func (s *staffService) BulkAssignRoleToEmployees(ctx context.Context, ids []string, role string) error {

	userID := utils.GetUserID(ctx)

	if err := s.employeeDataRepo.BulkAssignRole(ctx, ids, role); err != nil {
		s.logsError(system_entity.LogTypeStaffEmployeesAssignRole, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffEmployeesAssignDepartment, shared_entity.StatusCodeStaffEmployeeBulkAssignRoleOK, &userID, ids)
	return nil
}

func (s *staffService) BulkAssignDepartmentToEmployees(ctx context.Context, ids []string, department string, group *string) error {

	userID := utils.GetUserID(ctx)

	if err := s.employeeDataRepo.BulkAssignDepartment(ctx, ids, department, group); err != nil {
		s.logsError(system_entity.LogTypeStaffEmployeesAssignDepartment, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeStaffEmployeesAssignDepartment, shared_entity.StatusCodeStaffEmployeeBulkAssignDepartmentOK, &userID, ids)
	return nil
}

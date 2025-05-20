package staff_service

import (
	"context"
	"errors"

	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
)

var (
	ErrDepartmentGroupNotFound = errors.New("the department group was not found")

	ErrDepartmentNotFound         = errors.New("the department was not found")
	ErrDepartmentCreateNotAllowed = errors.New("you are not allowed to create departments")
	ErrDepartmentUpdateNotAllowed = errors.New("you are not allowed to update departments")
	ErrDepartmentDeleteNotAllowed = errors.New("you are not allowed to delete departments")

	ErrEmployeeNotFound                   = errors.New("the employee was not found")
	ErrEmployeeCreateNotAllowed           = errors.New("you are not allowed to create employees")
	ErrEmployeeUpdateNotAllowed           = errors.New("you are not allowed to update employees")
	ErrEmployeeDeleteNotAllowed           = errors.New("you are not allowed to delete employees")
	ErrEmployeeActivateNotAllowed         = errors.New("you are not allowed to activate employees")
	ErrEmployeeDeactivateNotAllowed       = errors.New("you are not allowed to deactivate employees")
	ErrEmployeePublishNotAllowed          = errors.New("you are not allowed to publish employees")
	ErrEmployeeUnpublishNotAllowed        = errors.New("you are not allowed to unpublish employees")
	ErrEmployeeAssignDepartmentNotAllowed = errors.New("you are not allowed to assign the department to employees")
	ErrEmployeeAssignRoleNotAllowed       = errors.New("you are not allowed to assign the role to employees")
	ErrEmployeeAccountDeactivated         = errors.New("you are not allowed to log in due to account deactivation")
	ErrEmployeeInvalidCredentials         = errors.New("you are not allowed to log in due to invalid credentials")

	ErrPositionNotFound          = errors.New("the position was not found")
	ErrDPositionCreateNotAllowed = errors.New("you are not allowed to create positions")
	ErrDPositionUpdateNotAllowed = errors.New("you are not allowed to update positions")
	ErrDPositionDeleteNotAllowed = errors.New("you are not allowed to delete positions")

	ErrRoleNotFound         = errors.New("the role was not found")
	ErrRoleCreateNotAllowed = errors.New("you are not allowed to create roles")
	ErrRoleUpdateNotAllowed = errors.New("you are not allowed to update roles")
	ErrRoleDeleteNotAllowed = errors.New("you are not allowed to delete roles")
)

type IStaffService interface {
	SearchDepartments(ctx context.Context, skip *int, limit *int, sort staff_entity.DepartmentSort, filter *staff_entity.DepartmentFilter) ([]*staff_entity.Department, int, error)
	GetDepartmentByID(ctx context.Context, id string) (*staff_entity.Department, error)
	SaveDepartment(ctx context.Context, input staff_entity.Department) (*staff_entity.Department, error)
	DeleteDepartment(ctx context.Context, id string) error
	BulkDeleteDepartments(ctx context.Context, ids []string) error

	SearchEmployees(ctx context.Context, skip *int, limit *int, sort staff_entity.EmployeeSort, filter *staff_entity.EmployeeFilter) ([]*staff_entity.Employee, int, error)
	GetEmployeeByID(ctx context.Context, id string) (*staff_entity.Employee, error)
	GetEmployeeByEmail(ctx context.Context, email string) (*staff_entity.Employee, error)
	Login(ctx context.Context, email string, password string) (*staff_entity.Employee, string, error)
	Logout(ctx context.Context) error
	SaveEmployee(ctx context.Context, input staff_entity.Employee) (*staff_entity.Employee, error)
	DeleteEmployee(ctx context.Context, id string) error
	BulkDeleteEmployees(ctx context.Context, ids []string) error
	BulkActivateEmployees(ctx context.Context, ids []string, state bool) error
	BulkPublishEmployees(ctx context.Context, ids []string, state bool) error
	BulkAssignRoleToEmployees(ctx context.Context, ids []string, role string) error
	BulkAssignDepartmentToEmployees(ctx context.Context, ids []string, department string, group *string) error

	SearchPositions(ctx context.Context, skip *int, limit *int, sort staff_entity.PositionSort, filter *staff_entity.PositionFilter) ([]*staff_entity.Position, int, error)
	GetPositionByID(ctx context.Context, id string) (*staff_entity.Position, error)
	SavePosition(ctx context.Context, input staff_entity.Position) (*staff_entity.Position, error)
	DeletePosition(ctx context.Context, id string) error
	BulkDeletePositions(ctx context.Context, ids []string) error

	SearchRoles(ctx context.Context, skip *int, limit *int, sort staff_entity.RoleSort, filter *staff_entity.RoleFilter) ([]*staff_entity.Role, int, error)
	GetRoleByID(ctx context.Context, id string) (*staff_entity.Role, error)
	SaveRole(ctx context.Context, input staff_entity.Role) (*staff_entity.Role, error)
	DeleteRole(ctx context.Context, id string) error
	BulkDeleteRoles(ctx context.Context, ids []string) error
}

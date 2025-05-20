package system_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Запись системного журнала
type Log struct {
	shared_entity.BaseDocument
	EntityID *string                  // Уникальный идентификатор сущности в связанной коллекции
	AuthorID *string                  // Идентификатор автора-источника события
	Type     LogType                  // Тип записи журнала
	Status   shared_entity.StatusCode // Код статуса выполнения операции
	Level    LogLevel                 // Уровень события
}

type Logs []Log     // Массив записей системного журнала
type LogPtrs []*Log // Массив указателей на записи системного журнала

type LogCollection string

type LogLevel string

const (
	LogLevelDebug   LogLevel = "DEBUG"
	LogLevelInfo    LogLevel = "INFO"
	LogLevelWarning LogLevel = "WARNING"
	LogLevelError   LogLevel = "ERROR"
	LogLevelFatal   LogLevel = "FATAL"
)

type LogType string

// Staff LogType Enums
const (
	LogTypeAuthLogin  LogType = "AUTH_LOGIN"
	LogTypeAuthLogout LogType = "AUTH_LOGOUT"

	LogTypeStaffEmployeeCreate            LogType = "STAFF_EMPLOYEE_CREATE"
	LogTypeStaffEmployeeUpdate            LogType = "STAFF_EMPLOYEE_UPDATE"
	LogTypeStaffEmployeeDelete            LogType = "STAFF_EMPLOYEE_DELETE"
	LogTypeStaffEmployeesDelete           LogType = "STAFF_EMPLOYEES_DELETE"
	LogTypeStaffEmployeesActivate         LogType = "STAFF_EMPLOYEES_ACTIVATE"
	LogTypeStaffEmployeesDeactivate       LogType = "STAFF_EMPLOYEES_DEACTIVATE"
	LogTypeStaffEmployeesPublish          LogType = "STAFF_EMPLOYEES_PUBLISH"
	LogTypeStaffEmployeesUnpublish        LogType = "STAFF_EMPLOYEES_UNPUBLISH"
	LogTypeStaffEmployeesAssignDepartment LogType = "STAFF_EMPLOYEES_ASSIGN_DEPARTMENT"
	LogTypeStaffEmployeesAssignRole       LogType = "STAFF_EMPLOYEES_ASSIGN_ROLE"

	LogTypeStaffRoleCreate  LogType = "STAFF_ROLE_CREATE"
	LogTypeStaffRoleUpdate  LogType = "STAFF_ROLE_UPDATE"
	LogTypeStaffRoleDelete  LogType = "STAFF_ROLE_DELETE"
	LogTypeStaffRolesDelete LogType = "STAFF_ROLES_DELETE"

	LogTypeStaffDepartmentCreate  LogType = "STAFF_DEPARTMENT_CREATE"
	LogTypeStaffDepartmentUpdate  LogType = "STAFF_DEPARTMENT_UPDATE"
	LogTypeStaffDepartmentDelete  LogType = "STAFF_DEPARTMENT_DELETE"
	LogTypeStaffDepartmentsDelete LogType = "STAFF_DEPARTMENTS_DELETE"

	LogTypeStaffPositionCreate  LogType = "STAFF_POSITION_CREATE"
	LogTypeStaffPositionUpdate  LogType = "STAFF_POSITION_UPDATE"
	LogTypeStaffPositionDelete  LogType = "STAFF_POSITION_DELETE"
	LogTypeStaffPositionsDelete LogType = "STAFF_POSITIONS_DELETE"
)

// Estate LogType enums
const (
	LogTypeEstateComplexHouseCreate  LogType = "ESTATE_COMPLEX_HOUSE_CREATE"
	LogTypeEstateComplexHouseUpdate  LogType = "ESTATE_COMPLEX_HOUSE_UPDATE"
	LogTypeEstateComplexHouseDelete  LogType = "ESTATE_COMPLEX_HOUSE_DELETE"
	LogTypeEstateComplexHousesDelete LogType = "ESTATE_COMPLEX_HOUSES_DELETE"

	LogTypeEstateComplexCreate   LogType = "ESTATE_COMPLEX_CREATE"
	LogTypeEstateComplexUpdate   LogType = "ESTATE_COMPLEX_UPDATE"
	LogTypeEstateComplexDelete   LogType = "ESTATE_COMPLEX_DELETE"
	LogTypeEstateComplexesDelete LogType = "ESTATE_COMPLEXES_DELETE"

	LogTypeEstateDeveloperCreate  LogType = "ESTATE_DEVELOPER_CREATE"
	LogTypeEstateDeveloperUpdate  LogType = "ESTATE_DEVELOPER_UPDATE"
	LogTypeEstateDeveloperDelete  LogType = "ESTATE_DEVELOPER_DELETE"
	LogTypeEstateDevelopersDelete LogType = "ESTATE_DEVELOPERS_DELETE"

	LogTypeEstatePropertyCreate             LogType = "ESTATE_PROPERTY_CREATE"
	LogTypeEstatePropertyUpdate             LogType = "ESTATE_PROPERTY_UPDATE"
	LogTypeEstatePropertyDelete             LogType = "ESTATE_PROPERTY_DELETE"
	LogTypeEstatePropertyChangeStatus       LogType = "ESTATE_PROPERTY_CHANGE_STATUS"
	LogTypeEstatePropertyRefresh            LogType = "ESTATE_PROPERTY_REFRESH"
	LogTypeEstatePropertiesDelete           LogType = "ESTATE_PROPERTIES_DELETE"
	LogTypeEstatePropertiesChangeStatus     LogType = "ESTATE_PROPERTIES_CHANGE_STATUS"
	LogTypeEstatePropertiesRefresh          LogType = "ESTATE_PROPERTIES_REFRESH"
	LogTypeEstatePropertyUpdatePriceHistory LogType = "ESTATE_PROPERTY_UPDATE_PRICE_HISTORY"

	LogTypeEstateVillageCreate  LogType = "ESTATE_VILLAGE_CREATE"
	LogTypeEstateVillageUpdate  LogType = "ESTATE_VILLAGE_UPDATE"
	LogTypeEstateVillageDelete  LogType = "ESTATE_VILLAGE_DELETE"
	LogTypeEstateVillagesDelete LogType = "ESTATE_VILLAGES_DELETE"

	LogTypeSalesContactCreate  LogType = "SALES_CONTACT_CREATE"
	LogTypeSalesContactUpdate  LogType = "SALES_CONTACT_UPDATE"
	LogTypeSalesContactDelete  LogType = "SALES_CONTACT_DELETE"
	LogTypeSalesContactsDelete LogType = "SALES_CONTACTS_DELETE"

	LogTypeSalesDealCreate       LogType = "SALES_DEAL_CREATE"
	LogTypeSalesDealUpdate       LogType = "SALES_DEAL_UPDATE"
	LogTypeSalesDealDelete       LogType = "SALES_DEAL_DELETE"
	LogTypeSalesDealChangeStage  LogType = "SALES_DEAL_CHANGE_STAGE"
	LogTypeSalesDealsDelete      LogType = "SALES_DEALS_DELETE"
	LogTypeSalesDealsChangeStage LogType = "SALES_DEALS_CHANGE_STAGE"

	LogTypeSalesLeadCreate        LogType = "SALES_LEAD_CREATE"
	LogTypeSalesLeadUpdate        LogType = "SALES_LEAD_UPDATE"
	LogTypeSalesLeadDelete        LogType = "SALES_LEAD_DELETE"
	LogTypeSalesLeadChangeStatus  LogType = "SALES_LEAD_CHANGE_STATUS"
	LogTypeSalesLeadsDelete       LogType = "SALES_LEADS_DELETE"
	LogTypeSalesLeadsChangeStatus LogType = "SALES_LEADS_CHANGE_STATUS"

	LogTypeSalesMeetCreate        LogType = "SALES_MEET_CREATE"
	LogTypeSalesMeetUpdate        LogType = "SALES_MEET_UPDATE"
	LogTypeSalesMeetDelete        LogType = "SALES_MEET_DELETE"
	LogTypeSalesMeetChangeStatus  LogType = "SALES_MEET_CHANGE_STATUS"
	LogTypeSalesMeetsDelete       LogType = "SALES_MEETS_DELETE"
	LogTypeSalesMeetsChangeStatus LogType = "SALES_MEETS_CHANGE_STATUS"

	LogTypeSalesTaskCreate    LogType = "SALES_TASK_CREATE"
	LogTypeSalesTaskUpdate    LogType = "SALES_TASK_UPDATE"
	LogTypeSalesTaskDelete    LogType = "SALES_TASK_DELETE"
	LogTypeSalesTaskComplete  LogType = "SALES_TASK_COMPLETE"
	LogTypeSalesTasksDelete   LogType = "SALES_TASKS_DELETE"
	LogTypeSalesTasksComplete LogType = "SALES_TASKS_COMPLETE"

	LogTypeSalesMortgageRequestCreate        LogType = "SALES_MORTGAGE_REQUEST_CREATE"
	LogTypeSalesMortgageRequestUpdate        LogType = "SALES_MORTGAGE_REQUEST_UPDATE"
	LogTypeSalesMortgageRequestDelete        LogType = "SALES_MORTGAGE_REQUEST_DELETE"
	LogTypeSalesMortgageRequestChangeStatus  LogType = "SALES_MORTGAGE_REQUEST_CHANGE_STATUS"
	LogTypeSalesMortgageRequestsDelete       LogType = "SALES_MORTGAGE_REQUESTS_DELETE"
	LogTypeSalesMortgageRequestsChangeStatus LogType = "SALES_MORTGAGE_REQUESTS_CHANGE_STATUS"
)

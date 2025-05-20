package crm_resolvers

import (
	content_service "github.com/pinks-agency/ecn/server/pkg/content/service"
	estate_service "github.com/pinks-agency/ecn/server/pkg/estate/service"
	exchange_service "github.com/pinks-agency/ecn/server/pkg/exchange/service"
	sales_service "github.com/pinks-agency/ecn/server/pkg/sales/service"
	staff_service "github.com/pinks-agency/ecn/server/pkg/staff/service"
	system_service "github.com/pinks-agency/ecn/server/pkg/system/service"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct {
	SystemService   system_service.ISystemService
	StaffService    staff_service.IStaffService
	ContentService  content_service.IContentService
	ExchangeService exchange_service.IExchangeService
	EstateService   estate_service.IEstateService
	SalesService    sales_service.ISalesService
}

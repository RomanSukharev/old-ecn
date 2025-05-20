package sales_service

import (
	"context"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
)

type ISalesService interface {
	SearchContacts(ctx context.Context, skip *int, limit *int, sort sales_entity.ContactSort, filter *sales_entity.ContactFilter) ([]*sales_entity.Contact, int, error)
	GetContactByID(ctx context.Context, id string) (*sales_entity.Contact, error)
	SaveContact(ctx context.Context, input sales_entity.Contact) (*sales_entity.Contact, error)
	DeleteContact(ctx context.Context, id string) error
	BulkDeleteContacts(ctx context.Context, ids []string) error

	SearchLeads(ctx context.Context, skip *int, limit *int, sort sales_entity.LeadSort, filter *sales_entity.LeadFilter) ([]*sales_entity.Lead, int, error)
	GetLeadByID(ctx context.Context, id string) (*sales_entity.Lead, error)
	SaveLead(ctx context.Context, input sales_entity.Lead) (*sales_entity.Lead, error)
	DeleteLead(ctx context.Context, id string) error
	ChangeLeadStatus(ctx context.Context, id string, status string, comment *string) error
	BulkDeleteLeads(ctx context.Context, ids []string) error
	BulkChangeLeadsStatus(ctx context.Context, ids []string, status string, comment *string) error

	SearchDeals(ctx context.Context, skip *int, limit *int, sort sales_entity.DealSort, filter *sales_entity.DealFilter) ([]*sales_entity.Deal, int, error)
	GetDealByID(ctx context.Context, id string) (*sales_entity.Deal, error)
	SaveDeal(ctx context.Context, input sales_entity.Deal) (*sales_entity.Deal, error)
	DeleteDeal(ctx context.Context, id string) error
	ChangeDealStage(ctx context.Context, id string, stage string) error
	BulkDeleteDeals(ctx context.Context, ids []string) error
	BulkChangeDealsStage(ctx context.Context, ids []string, stage string) error

	SearchMeets(ctx context.Context, skip *int, limit *int, sort sales_entity.MeetSort, filter *sales_entity.MeetFilter) ([]*sales_entity.Meet, int, error)
	GetMeetByID(ctx context.Context, id string) (*sales_entity.Meet, error)
	SaveMeet(ctx context.Context, input sales_entity.Meet) (*sales_entity.Meet, error)
	DeleteMeet(ctx context.Context, id string) error
	ChangeMeetStatus(ctx context.Context, id string, status string) error
	BulkDeleteMeets(ctx context.Context, ids []string) error
	BulkChangeMeetStatus(ctx context.Context, ids []string, status string) error

	SearchMortgageRequests(ctx context.Context, skip *int, limit *int, sort sales_entity.MortgageRequestSort, filter *sales_entity.MortgageRequestFilter) ([]*sales_entity.MortgageRequest, int, error)
	GetMortgageRequestByID(ctx context.Context, id string) (*sales_entity.MortgageRequest, error)
	SaveMortgageRequest(ctx context.Context, input sales_entity.MortgageRequest) (*sales_entity.MortgageRequest, error)
	DeleteMortgageRequest(ctx context.Context, id string) error
	ChangeMortgageRequestStatus(ctx context.Context, id string, status string) error
	BulkDeleteMortgageRequests(ctx context.Context, ids []string) error
	BulkChangeMortgageRequestsStatus(ctx context.Context, ids []string, status string) error

	SearchTasks(ctx context.Context, skip *int, limit *int, sort sales_entity.TaskSort, filter *sales_entity.TaskFilter) ([]*sales_entity.Task, int, error)
	GetTaskByID(ctx context.Context, id string) (*sales_entity.Task, error)
	SaveTask(ctx context.Context, input sales_entity.Task) (*sales_entity.Task, error)
	DeleteTask(ctx context.Context, id string) error
	CompleteTask(ctx context.Context, id string) error
	BulkDeleteTasks(ctx context.Context, ids []string) error
	BulkCompleteTasks(ctx context.Context, ids []string) error
}

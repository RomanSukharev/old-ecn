package sales_service

import (
	"context"
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *salesService) SearchContacts(ctx context.Context, skip *int, limit *int, sort sales_entity.ContactSort, filter *sales_entity.ContactFilter) ([]*sales_entity.Contact, int, error) {
	return s.contactsDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *salesService) GetContactByID(ctx context.Context, id string) (*sales_entity.Contact, error) {
	return s.contactsDataRepo.GetByID(ctx, id)
}

func (s *salesService) SaveContact(ctx context.Context, input sales_entity.Contact) (*sales_entity.Contact, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)

		maxInternalNumber, err := s.contactsDataRepo.GetNextInternalNumber(ctx)
		if err != nil {
			return nil, err
		}
		input.InternalNumber = utils.Pointer(maxInternalNumber)

		contact, err := s.contactsDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesContactCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesContactCreate, shared_entity.StatusCodeSalesContactCreateOK, &userID, &contact.ID)
		return contact, nil

	} else {
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		contact, err := s.contactsDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesContactUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesContactUpdate, shared_entity.StatusCodeSalesContactUpdateOK, &userID, &input.ID)
		return contact, nil
	}
}

func (s *salesService) DeleteContact(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.contactsDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeSalesContactDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesContactDelete, shared_entity.StatusCodeSalesContactDeleteOK, &userID, &id)
	return nil
}

func (s *salesService) BulkDeleteContacts(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.contactsDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeSalesContactsDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesContactsDelete, shared_entity.StatusCodeSalesContactBulkDeleteOK, &userID, ids)
	return nil
}

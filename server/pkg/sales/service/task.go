package sales_service

import (
	"context"
	"time"

	sales_entity "github.com/pinks-agency/ecn/server/pkg/sales/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
)

func (s *salesService) SearchTasks(ctx context.Context, skip *int, limit *int, sort sales_entity.TaskSort, filter *sales_entity.TaskFilter) ([]*sales_entity.Task, int, error) {
	return s.tasksDataRepo.Search(ctx, skip, limit, sort, filter)
}

func (s *salesService) GetTaskByID(ctx context.Context, id string) (*sales_entity.Task, error) {
	return s.tasksDataRepo.GetByID(ctx, id)
}

func (s *salesService) SaveTask(ctx context.Context, input sales_entity.Task) (*sales_entity.Task, error) {

	userID := utils.GetUserID(ctx)

	if input.ID == "" {
		input.Status = utils.Pointer(sales_entity.TaskStatusNew)
		input.CreatedAt = time.Now()
		input.UpdatedAt = input.CreatedAt
		input.IsDeleted = utils.Pointer(false)
		input.IsCompleted = utils.Pointer(false)

		maxInternalNumber, err := s.tasksDataRepo.GetNextInternalNumber(ctx)
		if err != nil {
			return nil, err
		}
		input.InternalNumber = utils.Pointer(maxInternalNumber)

		task, err := s.tasksDataRepo.Create(ctx, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesTaskCreate, &userID, nil, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesTaskCreate, shared_entity.StatusCodeSalesTaskCreateOK, &userID, &task.ID)
		return task, nil

	} else {
		input.CreatedAt = time.Time{}
		input.UpdatedAt = time.Now()

		task, err := s.tasksDataRepo.Update(ctx, input.ID, input)
		if err != nil {
			s.logError(system_entity.LogTypeSalesTaskUpdate, &userID, &input.ID, err)
			return nil, err
		}

		s.logInfo(system_entity.LogTypeSalesTaskUpdate, shared_entity.StatusCodeSalesTaskUpdateOK, &userID, &input.ID)
		return task, nil
	}
}

func (s *salesService) DeleteTask(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.tasksDataRepo.Delete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeSalesTaskDelete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesTaskDelete, shared_entity.StatusCodeSalesTaskDeleteOK, &userID, &id)
	return nil
}

func (s *salesService) CompleteTask(ctx context.Context, id string) error {

	userID := utils.GetUserID(ctx)

	if err := s.tasksDataRepo.Complete(ctx, id); err != nil {
		s.logError(system_entity.LogTypeSalesTaskComplete, &userID, &id, err)
		return err
	}

	s.logInfo(system_entity.LogTypeSalesTaskComplete, shared_entity.StatusCodeSalesTaskCompleteOK, &userID, &id)
	return nil
}

func (s *salesService) BulkDeleteTasks(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.tasksDataRepo.BulkDelete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeSalesTasksDelete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesTasksDelete, shared_entity.StatusCodeSalesTaskBulkDeleteOK, &userID, ids)
	return nil
}

func (s *salesService) BulkCompleteTasks(ctx context.Context, ids []string) error {

	userID := utils.GetUserID(ctx)

	if err := s.tasksDataRepo.BulkComplete(ctx, ids); err != nil {
		s.logsError(system_entity.LogTypeSalesTasksComplete, &userID, ids, err)
		return err
	}

	s.logsInfo(system_entity.LogTypeSalesTasksComplete, shared_entity.StatusCodeSalesTaskBulkCompleteOK, &userID, ids)
	return nil
}

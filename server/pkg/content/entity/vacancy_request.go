package content_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Отклик на вакансию
type VacancyRequest struct {
	shared_entity.BaseDocument
	VacancyID       *string              // Идентификатор вакансии
	Name            string               // Имя соискателя
	Phone           string               // Номер телефона соискателя
	Letter          string               // Сопроводительное письмо
	AttachmentIDs   []string             // Массив идентификаторов вложений
	InternalComment string               // Внутренний комментарий
	Status          VacancyRequestStatus // Статус отклика
}

type VacancyRequestStatus string // Статус отклика

const (
	VacancyRequestStatusNew      VacancyRequestStatus = "NEW"      // Новый
	VacancyRequestStatusDeclined VacancyRequestStatus = "DECLINED" // Отклонён
	VacancyRequestStatusApproved VacancyRequestStatus = "APPROVED" // Принят
)

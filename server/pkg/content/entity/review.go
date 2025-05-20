package content_entity

import (
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
)

// Отзыв на сотрудника
type Review struct {
	shared_entity.BaseDocument
	EmployeeID        *string                         // Идентификатор сотрудника
	Text              string                          // Текст отзыва
	AuthorName        string                          // Имя автора
	AuthorPhone       string                          // Номер телефона автора
	Status            ReviewStatus                    // Статус отзыва
	PublicationStatus shared_entity.PublicationStatus // Статус публикации отзыва
}

type Reviews []Review     // Массив отзывов
type ReviewPtrs []*Review // Массив указателей на отзывы

type ReviewStatus string // Статус отзыва

const (
	ReviewStatusNew      ReviewStatus = "NEW"      // Новый
	ReviewStatusApproved ReviewStatus = "APPROVED" // Подтверждён
	ReviewStatusDeclined ReviewStatus = "DECLINED" // Отклонён
)

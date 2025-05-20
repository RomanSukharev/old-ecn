package staff_entity

import (
	"time"

	"github.com/pinks-agency/ecn/server/pkg/errs"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"golang.org/x/crypto/bcrypt"
)

// Сотрудник
type Employee struct {
	shared_entity.BaseDocument
	Name             string          // Имя
	Surname          string          // Фамилия
	Patronymic       string          // Отчество
	Birthday         time.Time       // Дата рождения
	Email            string          // Адрес e-mail (логин)
	Password         string          // Пароль (хэш)
	Permissions      RolePermissions // Массив ролей
	Phone            string          // Номер телефона
	ChiefID          *string         // Идентификатор сотрудника-руководителя
	PositionID       *string         // Идентификатор должности
	DepartmentID     *string         // Идентификатор отдела
	GroupID          *string         // Идентификатор группы внутри отдела
	RoleID           *string         // Идентификатор роли
	InternalInfo     string          // Информация для внутреннего использования
	ShortDescription string          // Краткое описание для сайта
	Description      string          // Подробное описание для сайта
	IsPublished      bool            // Признак публикации на сайте
	IsDeleted        bool            // Признак удаления
	AvatarID         *string         // Идентификатор изображения для аватара
	PublicImageID    *string         // Идентификатор изображения для публичной карточки на сайте
}

type Employees []Employee
type EmployeePtrs []*Employee

// Хэширование пароля при сохранении
func (e *Employee) SetPassword(password string) *Employee {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err == nil {
		e.Password = string(hashedPassword)
	}

	return e
}

// Проверка пароля на совпадение с хэшем
func (e *Employee) VerifyPassword(password string) error {
	if err := bcrypt.CompareHashAndPassword([]byte(e.Password), []byte(password)); err != nil {
		return errs.ErrInvalidPassword
	}
	return nil
}

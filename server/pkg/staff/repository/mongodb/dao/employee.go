package staff_mongodb_dao

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type EmployeeDAO struct {
	ID               primitive.ObjectID  `bson:"_id,omitempty"`
	Name             string              `bson:"name,omitempty"`
	Surname          string              `bson:"surname,omitempty"`
	Patronymic       string              `bson:"patronymic,omitempty"`
	Birthday         time.Time           `bson:"birthday,omitempty"`
	Email            string              `bson:"email,omitempty"`
	Password         string              `bson:"password,omitempty"`
	Phone            string              `bson:"phone,omitempty"`
	PositionID       *primitive.ObjectID `bson:"position,omitempty"`
	DepartmentID     *primitive.ObjectID `bson:"department,omitempty"`
	GroupID          *primitive.ObjectID `bson:"group,omitempty"`
	RoleID           *primitive.ObjectID `bson:"role,omitempty"`
	InternalInfo     string              `bson:"internalInfo,omitempty"`
	ShortDescription string              `bson:"shortDescription,omitempty"`
	Description      string              `bson:"description,omitempty"`
	IsPublished      bool                `bson:"isPublished,omitempty"`
	IsDeleted        bool                `bson:"isDeleted,omitempty"`
	AvatarID         *primitive.ObjectID `bson:"avatar,omitempty"`
	PublicImageID    *primitive.ObjectID `bson:"publicImage,omitempty"`
	CreatedAt        time.Time           `bson:"createdAt,omitempty"`
	UpdatedAt        time.Time           `bson:"updatedAt,omitempty"`
}

func (dao *EmployeeDAO) FromEntity(entity staff_entity.Employee) *EmployeeDAO {
	// Prepare result
	*dao = EmployeeDAO{
		Name:             entity.Name,
		Surname:          entity.Surname,
		Patronymic:       entity.Patronymic,
		Birthday:         entity.Birthday,
		Email:            entity.Email,
		Phone:            entity.Phone,
		InternalInfo:     entity.InternalInfo,
		ShortDescription: entity.ShortDescription,
		Description:      entity.Description,
		IsPublished:      entity.IsPublished,
		IsDeleted:        entity.IsDeleted,
		CreatedAt:        entity.CreatedAt,
		UpdatedAt:        entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.PositionID); err == nil {
		dao.PositionID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.DepartmentID); err == nil {
		dao.DepartmentID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.GroupID); err == nil {
		dao.GroupID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.RoleID); err == nil {
		dao.RoleID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.AvatarID); err == nil {
		dao.AvatarID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.PublicImageID); err == nil {
		dao.PublicImageID = eid
	}

	// All done
	return dao
}

func (dao *EmployeeDAO) ToEntity() *staff_entity.Employee {
	// Prepare result
	return &staff_entity.Employee{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		Name:             dao.Name,
		Surname:          dao.Surname,
		Patronymic:       dao.Patronymic,
		Birthday:         dao.Birthday,
		Email:            dao.Email,
		Password:         dao.Password,
		Phone:            dao.Phone,
		PositionID:       utils.StringFromObjectID(dao.PositionID),
		DepartmentID:     utils.StringFromObjectID(dao.DepartmentID),
		GroupID:          utils.StringFromObjectID(dao.GroupID),
		RoleID:           utils.StringFromObjectID(dao.RoleID),
		InternalInfo:     dao.InternalInfo,
		ShortDescription: dao.ShortDescription,
		Description:      dao.Description,
		IsPublished:      dao.IsPublished,
		IsDeleted:        dao.IsDeleted,
		AvatarID:         utils.StringFromObjectID(dao.AvatarID),
		PublicImageID:    utils.StringFromObjectID(dao.PublicImageID),
	}
}

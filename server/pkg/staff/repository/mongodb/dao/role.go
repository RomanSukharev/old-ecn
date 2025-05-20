package staff_mongodb_dao

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type RoleDAO struct {
	ID          primitive.ObjectID `bson:"_id,omitempty"`
	Title       string             `bson:"title,omitempty"`
	Permissions []string           `bson:"permissions,omitempty"`
	CreatedAt   time.Time          `bson:"createdAt,omitempty"`
	UpdatedAt   time.Time          `bson:"updatedAt,omitempty"`
}

func (dao *RoleDAO) FromEntity(entity staff_entity.Role) *RoleDAO {
	// Prepare result
	*dao = RoleDAO{
		Title:       entity.Title,
		Permissions: entity.Permissions.String(),
		CreatedAt:   entity.CreatedAt,
		UpdatedAt:   entity.UpdatedAt,
	}

	// All done
	return dao
}

func (dao *RoleDAO) ToEntity() *staff_entity.Role {
	// Prepare premissions
	permissions := make(staff_entity.RolePermissions, 0, len(dao.Permissions))
	for _, v := range dao.Permissions {
		permissions = append(permissions, staff_entity.RolePermission(v))
	}

	// Prepare result
	return &staff_entity.Role{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		Title:       dao.Title,
		Permissions: permissions,
	}
}

package staff_mongodb_dao

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DepartmentDAO struct {
	ID        primitive.ObjectID  `bson:"_id,omitempty"`
	ChiefID   *primitive.ObjectID `bson:"chief,omitempty"`
	Title     string              `bson:"title,omitempty"`
	CreatedAt time.Time           `bson:"createdAt,omitempty"`
	UpdatedAt time.Time           `bson:"updatedAt,omitempty"`
}

func (dao *DepartmentDAO) FromEntity(entity staff_entity.Department) *DepartmentDAO {
	// Prepare result
	*dao = DepartmentDAO{
		Title:     entity.Title,
		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.ChiefID); err == nil {
		dao.ChiefID = eid
	}

	// All done
	return dao
}

func (dao *DepartmentDAO) ToEntity() *staff_entity.Department {
	// Prepare result
	return &staff_entity.Department{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		ChiefID: utils.StringFromObjectID(dao.ChiefID),
		Title:   dao.Title,
	}
}

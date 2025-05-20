package staff_mongodb_dao

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type DepartmentWithGroupsDAO struct {
	ID        primitive.ObjectID   `bson:"_id,omitempty"`
	ChiefID   *primitive.ObjectID  `bson:"chief,omitempty"`
	Title     string               `bson:"title,omitempty"`
	Groups    []DepartmentGroupDAO `bson:"-"`
	CreatedAt time.Time            `bson:"createdAt,omitempty"`
	UpdatedAt time.Time            `bson:"updatedAt,omitempty"`
}

func (dao *DepartmentWithGroupsDAO) FromEntity(entity staff_entity.Department) *DepartmentWithGroupsDAO {
	// Prepare result
	*dao = DepartmentWithGroupsDAO{
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

	for _, v := range entity.Groups {
		group := new(DepartmentGroupDAO).FromEntity(v)
		dao.Groups = append(dao.Groups, *group)
	}

	// All done
	return dao
}

func (dao *DepartmentWithGroupsDAO) ToEntity() *staff_entity.Department {
	var groups []staff_entity.DepartmentGroup
	for _, v := range dao.Groups {
		groups = append(groups, *v.ToEntity())
	}

	// Prepare result
	return &staff_entity.Department{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		ChiefID: utils.StringFromObjectID(dao.ChiefID),
		Title:   dao.Title,
		Groups:  groups,
	}
}

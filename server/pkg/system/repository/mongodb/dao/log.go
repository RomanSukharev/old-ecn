package system_mongodb_dao

import (
	"time"

	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type LogDAO struct {
	ID        primitive.ObjectID  `bson:"_id,omitempty"`
	EntityID  *primitive.ObjectID `bson:"entity,omitempty"`
	AuthorID  *primitive.ObjectID `bson:"author,omitempty"`
	Type      string              `bson:"type,omitempty"`
	Level     string              `bson:"level,omitempty"`
	Status    string              `bson:"status,omitempty"`
	CreatedAt time.Time           `bson:"createdAt,omitempty"`
	UpdatedAt time.Time           `bson:"updatedAt,omitempty"`
}

func (dao *LogDAO) FromEntity(entity system_entity.Log) *LogDAO {
	// Prepare result
	*dao = LogDAO{
		Type:      string(entity.Type),
		Level:     string(entity.Level),
		Status:    string(entity.Status),
		CreatedAt: entity.CreatedAt,
		UpdatedAt: entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	if eid, err := utils.ObjectIDFromString(entity.EntityID); err == nil {
		dao.EntityID = eid
	}

	if eid, err := utils.ObjectIDFromString(entity.AuthorID); err == nil {
		dao.AuthorID = eid
	}

	// All done
	return dao
}

func (dao *LogDAO) ToEntity() *system_entity.Log {
	// Prepare result
	return &system_entity.Log{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		EntityID: utils.StringFromObjectID(dao.EntityID),
		AuthorID: utils.StringFromObjectID(dao.AuthorID),
		Type:     system_entity.LogType(dao.Type),
		Level:    system_entity.LogLevel(dao.Level),
		Status:   shared_entity.StatusCode(dao.Status),
	}
}

package content_mongodb_dao

import (
	"time"

	content_entity "github.com/pinks-agency/ecn/server/pkg/content/entity"
	shared_entity "github.com/pinks-agency/ecn/server/pkg/shared/entity"
	"github.com/pinks-agency/ecn/server/utils"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type VacancyDAO struct {
	ID                primitive.ObjectID `bson:"_id,omitempty"`
	Title             string             `bson:"title,omitempty"`
	Description       string             `bson:"description,omitempty"`
	Experience        string             `bson:"experience,omitempty"`
	Salary            string             `bson:"salary,omitempty"`
	Schedule          string             `bson:"schedule,omitempty"`
	PublicationStatus string             `bson:"publicationStatus,omitempty"`
	CreatedAt         time.Time          `bson:"createdAt,omitempty"`
	UpdatedAt         time.Time          `bson:"updatedAt,omitempty"`
}

func (dao *VacancyDAO) FromEntity(entity content_entity.Vacancy) *VacancyDAO {
	*dao = VacancyDAO{
		Title:             entity.Title,
		Description:       entity.Description,
		Experience:        entity.Experience,
		Salary:            entity.Salary,
		Schedule:          string(entity.Schedule),
		PublicationStatus: string(entity.PublicationStatus),
		CreatedAt:         entity.CreatedAt,
		UpdatedAt:         entity.UpdatedAt,
	}

	if eid, err := utils.ObjectIDFromString(&entity.ID); err == nil {
		dao.ID = *eid
	}

	return dao
}

func (dao *VacancyDAO) ToEntity() *content_entity.Vacancy {
	return &content_entity.Vacancy{
		BaseDocument: shared_entity.BaseDocument{
			ID:        dao.ID.Hex(),
			CreatedAt: dao.CreatedAt,
			UpdatedAt: dao.UpdatedAt,
		},
		Title:             dao.Title,
		Description:       dao.Description,
		Experience:        dao.Experience,
		Salary:            dao.Salary,
		Schedule:          content_entity.VacancySchedule(dao.Schedule),
		PublicationStatus: shared_entity.PublicationStatus(dao.PublicationStatus),
	}
}

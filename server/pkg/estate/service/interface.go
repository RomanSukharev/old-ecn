package estate_service

import (
	"context"

	estate_entity "github.com/pinks-agency/ecn/server/pkg/estate/entity"
)

type IEstateService interface {
	SearchDevelopers(ctx context.Context, skip *int, limit *int, sort estate_entity.DeveloperSort, filter *estate_entity.DeveloperFilter) ([]*estate_entity.Developer, int, error)
	GetDeveloperByID(ctx context.Context, id string) (*estate_entity.Developer, error)
	SaveDeveloper(ctx context.Context, input estate_entity.Developer) (*estate_entity.Developer, error)
	DeleteDeveloper(ctx context.Context, id string) error
	BulkDeleteDevelopers(ctx context.Context, ids []string) error

	SearchComplexes(ctx context.Context, skip *int, limit *int, sort estate_entity.ComplexSort, filter *estate_entity.ComplexFilter) ([]*estate_entity.Complex, int, error)
	GetComplexByID(ctx context.Context, id string) (*estate_entity.Complex, error)
	SaveComplex(ctx context.Context, input estate_entity.Complex) (*estate_entity.Complex, error)
	DeleteComplex(ctx context.Context, id string) error
	BulkDeleteComplexes(ctx context.Context, ids []string) error

	SearchComplexHouses(ctx context.Context, skip *int, limit *int, sort estate_entity.ComplexHouseSort, filter *estate_entity.ComplexHouseFilter) ([]*estate_entity.ComplexHouse, int, error)
	GetComplexHouseByID(ctx context.Context, id string) (*estate_entity.ComplexHouse, error)
	SaveComplexHouse(ctx context.Context, input estate_entity.ComplexHouse) (*estate_entity.ComplexHouse, error)
	DeleteComplexHouse(ctx context.Context, id string) error
	BulkDeleteComplexHouses(ctx context.Context, ids []string) error

	SearchVillages(ctx context.Context, skip *int, limit *int, sort estate_entity.VillageSort, filter *estate_entity.VillageFilter) ([]*estate_entity.Village, int, error)
	GetVillageByID(ctx context.Context, id string) (*estate_entity.Village, error)
	SaveVillage(ctx context.Context, input estate_entity.Village) (*estate_entity.Village, error)
	DeleteVillage(ctx context.Context, id string) error
	BulkDeleteVillages(ctx context.Context, ids []string) error

	SearchProperties(ctx context.Context, skip *int, limit *int, sort estate_entity.PropertySort, filter *estate_entity.PropertyFilter) ([]*estate_entity.Property, int, error)
	GetPropertyByID(ctx context.Context, id string) (*estate_entity.Property, error)
	SaveProperty(ctx context.Context, input estate_entity.Property) (*estate_entity.Property, error)
	DeleteProperty(ctx context.Context, id string) error
	ChangePropertyStatus(ctx context.Context, id string, status estate_entity.PropertyStatus) error
	RefreshProperty(ctx context.Context, id string) error
	BulkDeleteProperties(ctx context.Context, ids []string) error
	BulkChangePropertiesStatus(ctx context.Context, ids []string, status estate_entity.PropertyStatus) error
	BulkRefreshProperties(ctx context.Context, ids []string) error
}

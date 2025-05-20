package exchange_service

import (
	"context"

	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
)

type IExchangeService interface {
	GetImageByID(ctx context.Context, id string) (*exchange_entity.Image, error)
	UploadImage(ctx context.Context, image exchange_entity.Image) (*exchange_entity.Image, error)
	DeleteImage(ctx context.Context, id string) error

	GetDocumentByID(ctx context.Context, id string) (*exchange_entity.Document, error)
	UploadDocument(ctx context.Context, image exchange_entity.Document) (*exchange_entity.Document, error)
	DeleteDocument(ctx context.Context, id string) error
}

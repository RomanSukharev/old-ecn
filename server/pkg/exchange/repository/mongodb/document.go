package exchange_mongodb

import (
	"context"
	"net/url"
	"path/filepath"
	"time"

	"github.com/aws/aws-sdk-go-v2/service/s3"
	exchange_entity "github.com/pinks-agency/ecn/server/pkg/exchange/entity"
	exchange_repository "github.com/pinks-agency/ecn/server/pkg/exchange/repository"
	exchange_mongodb_dao "github.com/pinks-agency/ecn/server/pkg/exchange/repository/mongodb/dao"
	"github.com/pinks-agency/ecn/server/pkg/infrastructure"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type documentRepository struct {
	documentCollection *mongo.Collection
	s3Infra            *infrastructure.S3
}

func NewDocumentRepository(mongodbInfra *infrastructure.MongoDB, s3Infra *infrastructure.S3) exchange_repository.IDocumentDataRepository {
	documentCollection := mongodbInfra.Database.Collection("documents")

	documentCollection.Indexes().CreateOne(context.TODO(), mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}})

	return &documentRepository{
		documentCollection: documentCollection,
		s3Infra:            s3Infra,
	}
}

func (r *documentRepository) GetByID(ctx context.Context, id string) (*exchange_entity.Document, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.documentCollection.FindOne(ctx, query)

	var dao *exchange_mongodb_dao.DocumentDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *documentRepository) Upload(ctx context.Context, input exchange_entity.Document) (*exchange_entity.Document, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	input.ID = primitive.NewObjectID().Hex()

	input.Path = filepath.Join("/", "documents", input.ID, input.FileName)
	if u, err := url.JoinPath(r.s3Infra.PublicDomain, input.Path); err == nil {
		input.URL = u
	}

	file := input.File
	if _, err := r.s3Infra.Client.PutObject(ctx, &s3.PutObjectInput{
		Bucket: &r.s3Infra.Bucket,
		Key:    &input.Path,
		Body:   file,
	}); err != nil {
		return nil, err
	}

	dao := new(exchange_mongodb_dao.DocumentDAO).FromEntity(input)

	res, err := r.documentCollection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.documentCollection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *documentRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	query := bson.M{"_id": entityId}
	doc := r.documentCollection.FindOne(ctx, query)

	var dao *exchange_mongodb_dao.DocumentDAO
	if err := doc.Decode(&dao); err != nil {
		return err
	}

	if _, err := r.s3Infra.Client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: &r.s3Infra.Bucket,
		Key:    &dao.Path,
	}); err != nil {
		return err
	}

	if _, err := r.documentCollection.DeleteOne(ctx, query); err != nil {
		return err
	}

	return nil
}

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

type imageRepository struct {
	imageCollection *mongo.Collection
	s3Infra         *infrastructure.S3
}

func NewImageRepository(mongodbInfra *infrastructure.MongoDB, s3Infra *infrastructure.S3) exchange_repository.IImageDataRepository {
	imageCollection := mongodbInfra.Database.Collection("images")

	imageCollection.Indexes().CreateOne(context.TODO(), mongo.IndexModel{Keys: bson.D{{Key: "title", Value: "text"}}})

	return &imageRepository{
		imageCollection: imageCollection,
		s3Infra:         s3Infra,
	}
}

func (r *imageRepository) GetByID(ctx context.Context, id string) (*exchange_entity.Image, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": entityId}
	doc := r.imageCollection.FindOne(ctx, query)

	var dao *exchange_mongodb_dao.ImageDAO
	if err := doc.Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *imageRepository) Upload(ctx context.Context, input exchange_entity.Image) (*exchange_entity.Image, error) {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	input.ID = primitive.NewObjectID().Hex()

	var imagePrefix string
	switch input.Preset {
	case exchange_entity.ImagePresetStaffEmployeeAvatar:
		{
			imagePrefix = "staff_employee_avatar"
		}
	case exchange_entity.ImagePresetStaffEmployeePublicImage:
		{
			imagePrefix = "staff_employee_publicImage"
		}
	case exchange_entity.ImagePresetContentKbArticleCover:
		{
			imagePrefix = "content_article_cover"
		}
	case exchange_entity.ImagePresetContentSiteStoryCover:
		{
			imagePrefix = "content_story_cover"
		}
	case exchange_entity.ImagePresetContentSiteStoryPhoto:
		{
			imagePrefix = "content_story_photo"
		}
	case exchange_entity.ImagePresetEstatePropertyPhoto:
		{
			imagePrefix = "estate_property_photo"
		}
	case exchange_entity.ImagePresetEstateComplexPhoto:
		{
			imagePrefix = "estate_complex_photo"
		}
	default:
		{
			imagePrefix = ""
		}
	}

	input.Path = filepath.Join("/", "images", imagePrefix, input.ID, input.FileName)
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

	dao := new(exchange_mongodb_dao.ImageDAO).FromEntity(input)

	res, err := r.imageCollection.InsertOne(ctx, *dao)
	if err != nil {
		return nil, err
	}

	query := bson.M{"_id": res.InsertedID}
	if err := r.imageCollection.FindOne(ctx, query).Decode(&dao); err != nil {
		return nil, err
	}

	return dao.ToEntity(), nil
}

func (r *imageRepository) Delete(ctx context.Context, id string) error {
	ctx, cancel := context.WithTimeout(ctx, time.Duration(time.Second*5))
	defer cancel()

	entityId, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}

	query := bson.M{"_id": entityId}
	doc := r.imageCollection.FindOne(ctx, query)

	var dao *exchange_mongodb_dao.ImageDAO
	if err := doc.Decode(&dao); err != nil {
		return err
	}

	if _, err := r.s3Infra.Client.DeleteObject(ctx, &s3.DeleteObjectInput{
		Bucket: &r.s3Infra.Bucket,
		Key:    &dao.Path,
	}); err != nil {
		return err
	}

	if _, err := r.imageCollection.DeleteOne(ctx, query); err != nil {
		return err
	}

	return nil
}

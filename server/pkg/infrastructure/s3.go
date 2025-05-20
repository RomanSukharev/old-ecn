package infrastructure

import (
	"bytes"
	"context"
	"io"

	"github.com/pinks-agency/ecn/server/config"
	appConfig "github.com/pinks-agency/ecn/server/config"

	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
)

type S3 struct {
	config       *config.Config
	Client       *s3.Client
	Bucket       string
	PublicDomain string
}

func NewS3(config *appConfig.Config) *S3 {
	client := s3.New(s3.Options{
		Region:       "ru-1",
		Credentials:  credentials.NewStaticCredentialsProvider(config.S3.AccessKey, config.S3.SecretKey, "aws_session"),
		BaseEndpoint: &config.S3.Endpoint,
	})

	return &S3{
		config:       config,
		Client:       client,
		Bucket:       config.S3.Bucket,
		PublicDomain: config.S3.PublicDomain,
	}
}

func (s *S3) Upload(path string, data []byte) error {
	_, err := s.Client.PutObject(context.TODO(), &s3.PutObjectInput{
		Bucket: &s.Bucket,
		Key:    &path,
		Body:   bytes.NewReader(data),
	})
	return err
}

func (s *S3) Download(path string) ([]byte, error) {
	output, err := s.Client.GetObject(context.TODO(), &s3.GetObjectInput{
		Bucket: &s.Bucket,
		Key:    &path,
	})
	if err != nil {
		return nil, err
	}

	content, err := io.ReadAll(output.Body)
	if err != nil {
		return nil, err
	}

	return content, nil
}

package infrastructure

import (
	"context"
	"log/slog"

	"github.com/pinks-agency/ecn/server/config"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"
)

type MongoDB struct {
	config      *config.Config
	MongoClient *mongo.Client
	Database    *mongo.Database
}

func NewMongoDBClient(config *config.Config) *MongoDB {
	return &MongoDB{
		config: config,
	}
}

func (d *MongoDB) Connect() error {
	slog.Debug("Init DB connection...")
	ctx := context.TODO()

	// Connect to MongoDB
	mongoconn := options.Client().ApplyURI(d.config.MongoDB.Uri).SetBSONOptions(&options.BSONOptions{
		UseJSONStructTags: true, // Set struct json tag usage if no bson present
		NilSliceAsEmpty:   true,
	})
	mongoClient, err := mongo.Connect(ctx, mongoconn)
	if err != nil {
		return err
	}

	if err := mongoClient.Ping(ctx, readpref.Primary()); err != nil {
		return err
	}

	slog.Info("MongoDB successfully connected.")

	d.MongoClient = mongoClient
	d.Database = mongoClient.Database(d.config.MongoDB.Database)

	return nil
}

func (d *MongoDB) GetCollection(collection string) *mongo.Collection {
	return d.Database.Collection(collection)
}

func (d *MongoDB) Disconnect() error {
	slog.Info("Disconnecting DB...")
	ctx := context.TODO()
	return d.MongoClient.Disconnect(ctx)
}

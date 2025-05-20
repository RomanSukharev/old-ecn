package public_facade

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/99designs/gqlgen/graphql"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/go-playground/validator/v10"
	"github.com/vektah/gqlparser/v2/gqlerror"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/rs/cors"

	"github.com/pinks-agency/ecn/server/config"
	public_gateway "github.com/pinks-agency/ecn/server/internal/public-facade/gateway"
	public_resolvers "github.com/pinks-agency/ecn/server/internal/public-facade/resolvers"
	content_service "github.com/pinks-agency/ecn/server/pkg/content/service"
	estate_service "github.com/pinks-agency/ecn/server/pkg/estate/service"
	exchange_service "github.com/pinks-agency/ecn/server/pkg/exchange/service"
	"github.com/pinks-agency/ecn/server/pkg/infrastructure"
	staff_service "github.com/pinks-agency/ecn/server/pkg/staff/service"
	system_service "github.com/pinks-agency/ecn/server/pkg/system/service"
)

type Application struct {
	Config *config.Config
}

func Start() {
	slog.SetLogLoggerLevel(slog.LevelDebug)
	slog.Info("Starting Public Facade application...")

	// Init Config
	config := config.MustLoad()

	// Init Validator
	validate := validator.New()

	// Init Database
	mongodb := infrastructure.NewMongoDBClient(config)
	if err := mongodb.Connect(); err != nil {
		panic(err)
	}

	// Init Cache storage
	// Init File storage
	s3 := infrastructure.NewS3(config)

	// Init Message broker

	// Init Services
	staffService, err := staff_service.New(
		staff_service.WithMongoDB(mongodb.Database),
	)
	if err != nil {
		panic(err)
	}

	systemService, err := system_service.New(
		system_service.WithMongoDB(mongodb.Database),
	)
	if err != nil {
		panic(err)
	}

	contentService, err := content_service.New(
		content_service.WithMongoDB(mongodb.Database),
	)
	if err != nil {
		panic(err)
	}

	exchangeService, err := exchange_service.New(
		exchange_service.WithMongoDBAndS3(mongodb, s3),
	)
	if err != nil {
		panic(err)
	}

	estateService, err := estate_service.New(
		estate_service.WithMongoDB(mongodb.Database),
	)
	if err != nil {
		panic(err)
	}

	// Init GraphQL
	resolver := &public_resolvers.Resolver{
		SystemService:   systemService,
		StaffService:    staffService,
		ContentService:  contentService,
		ExchangeService: exchangeService,
		EstateService:   estateService,
	}
	schema := public_gateway.Config{Resolvers: resolver}

	// Handle @validate directive
	schema.Directives.Validate = func(ctx context.Context, obj interface{}, next graphql.Resolver, constraint string) (interface{}, error) {
		val, err := next(ctx)
		if err != nil {
			panic(err)
		}

		err = validate.Var(val, constraint)
		if err != nil {
			return nil, err
		}

		return val, nil
	}

	srv := handler.New(public_gateway.NewExecutableSchema(schema))
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	// Set file upload limits
	var mb int64 = 1 << 20
	srv.AddTransport(transport.MultipartForm{
		MaxMemory:     32 * mb,
		MaxUploadSize: 50 * mb,
	})

	// Enable schema introspection
	srv.Use(extension.Introspection{})

	// Configure default GraphQL error handler
	srv.SetErrorPresenter(func(ctx context.Context, e error) *gqlerror.Error {
		err := graphql.DefaultErrorPresenter(ctx, e)
		slog.Error("GraphQL request failed",
			"message", err.Message,
			"path", err.Path,
			"locations", err.Locations,
			"extensions", err.Extensions,
			"rule", err.Rule,
		)

		return err
	})

	// Configure per-request logging
	srv.AroundOperations(func(ctx context.Context, next graphql.OperationHandler) graphql.ResponseHandler {
		oc := graphql.GetOperationContext(ctx)
		slog.Debug("GraphQL request",
			"operation", oc.OperationName,
			"query", oc.RawQuery)
		return next(ctx)
	})

	// Init HTTP server
	router := chi.NewRouter()
	router.Use(middleware.Heartbeat("/ping"))
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   config.Services.PublicFacade.Origins,
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	}).Handler)
	router.Handle("/", playground.AltairHandler("GraphQL playground", "/graphql"))
	router.Handle("/graphql", srv)
	server := &http.Server{
		Addr:    config.Services.PublicFacade.Port,
		Handler: router,
	}

	// Run HTTP server as goroutine
	go func() {
		fmt.Printf("Connect to http://localhost%s/ for GraphQL playground\n", config.Services.PublicFacade.Port)
		if err := server.ListenAndServe(); !errors.Is(err, http.ErrServerClosed) {
			slog.Error("HTTP server error", err)
		}
		slog.Info("Stopped serving new connections.")
	}()

	// Handle graceful shutdown
	sigChan := make(chan os.Signal, 1)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)
	<-sigChan

	shutdownCtx, shutdownRelease := context.WithTimeout(context.Background(), 10*time.Second)
	defer shutdownRelease()

	if err := server.Shutdown(shutdownCtx); err != nil {
		slog.Error("HTTP shutdown error", err)
	}

	if err := mongodb.Disconnect(); err != nil {
		slog.Error("DB disconnect error", err)
	}
}

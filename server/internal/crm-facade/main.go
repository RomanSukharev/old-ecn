package crm_facade

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"slices"
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
	crm_gateway "github.com/pinks-agency/ecn/server/internal/crm-facade/gateway"
	crm_facade_middleware "github.com/pinks-agency/ecn/server/internal/crm-facade/middleware"
	crm_resolvers "github.com/pinks-agency/ecn/server/internal/crm-facade/resolvers"
	content_service "github.com/pinks-agency/ecn/server/pkg/content/service"
	estate_service "github.com/pinks-agency/ecn/server/pkg/estate/service"
	exchange_service "github.com/pinks-agency/ecn/server/pkg/exchange/service"
	"github.com/pinks-agency/ecn/server/pkg/infrastructure"
	sales_service "github.com/pinks-agency/ecn/server/pkg/sales/service"
	staff_entity "github.com/pinks-agency/ecn/server/pkg/staff/entity"
	staff_service "github.com/pinks-agency/ecn/server/pkg/staff/service"
	system_entity "github.com/pinks-agency/ecn/server/pkg/system/entity"
	system_service "github.com/pinks-agency/ecn/server/pkg/system/service"
)

type Application struct {
	Config *config.Config
}

func Start() {
	slog.SetLogLoggerLevel(slog.LevelDebug)
	slog.Info("Starting CRM-Facade application...")

	// Init Config
	config := config.MustLoad()

	// Init Validator
	validate := validator.New(validator.WithRequiredStructEnabled())

	// Init Database
	mongodb := infrastructure.NewMongoDBClient(config)
	if err := mongodb.Connect(); err != nil {
		panic(err)
	}

	// Init Cache storage
	// Init File storage
	s3 := infrastructure.NewS3(config)

	// Init Message broker

	// Init event chan
	systemLog := make(chan system_entity.Log)

	// Init Services
	staffService, err := staff_service.New(staff_service.WithSystemLog(systemLog),
		staff_service.WithMongoDB(mongodb.Database),
	)
	if err != nil {
		panic(err)
	}

	systemService, err := system_service.New(system_service.WithLogChannel(systemLog),
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

	estateService, err := estate_service.New(estate_service.WithSystemLog(systemLog),
		estate_service.WithMongoDB(mongodb.Database),
	)
	if err != nil {
		panic(err)
	}

	salesService, err := sales_service.New(sales_service.WithSystemLog(systemLog),
		sales_service.WithMongoDB(mongodb.Database),
	)
	if err != nil {
		panic(err)
	}

	// Init GraphQL
	resolver := &crm_resolvers.Resolver{
		SystemService:   systemService,
		StaffService:    staffService,
		ContentService:  contentService,
		ExchangeService: exchangeService,
		EstateService:   estateService,
		SalesService:    salesService,
	}
	schema := crm_gateway.Config{Resolvers: resolver}

	// Handle @auth directive
	schema.Directives.Auth = func(ctx context.Context, obj interface{}, next graphql.Resolver) (interface{}, error) {
		user := crm_facade_middleware.ForContext(ctx)
		if user == nil {
			// block calling the next resolver
			return nil, gqlerror.Errorf("Access denied")
		}

		// or let it pass through
		return next(ctx)
	}

	// Handle @hasPermissions directive
	schema.Directives.HasPermission = func(ctx context.Context, obj interface{}, next graphql.Resolver, permission string) (interface{}, error) {
		user := crm_facade_middleware.ForContext(ctx)
		if user == nil {
			// block calling the next resolver
			return nil, gqlerror.Errorf("Access denied")
		}

		if !slices.Contains(user.Permissions, staff_entity.RolePermission(permission)) {
			return nil, gqlerror.Errorf("Access denied")
		}

		// or let it pass through
		return next(ctx)
	}

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

	srv := handler.New(crm_gateway.NewExecutableSchema(schema))
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
	router.Use(crm_facade_middleware.AuthMiddleware(staffService))
	router.Use(cors.New(cors.Options{
		AllowedOrigins:   config.Services.CRMFacade.Origins,
		AllowCredentials: true,
		AllowedHeaders:   []string{"*"},
	}).Handler)
	router.Handle("/", playground.AltairHandler("GraphQL playground", "/graphql"))
	router.Handle("/graphql", srv)
	server := &http.Server{
		Addr:    config.Services.CRMFacade.Port,
		Handler: router,
	}

	// Run HTTP server as goroutine
	go func() {
		fmt.Printf("Connect to http://localhost%s/ for GraphQL playground\n", config.Services.CRMFacade.Port)
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

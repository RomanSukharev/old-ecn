# First-time module init
.PHONY: prepare
prepare:
	go mod download

# Generate GraphQL types and resolvers
.PHONE: generate
generate:
	cd internal/crm-facade && go run github.com/99designs/gqlgen generate
	cd internal/public-facade && go run github.com/99designs/gqlgen generate

# Launch tests
.PHONY: test
test:
	go test -v ./...

# Build all service binaries
.PHONY: build
build:
	CGO_ENABLED=0 GOOS=linux go build -ldflags "-w -s" -o ./crm-facade-service ./cmd/crm-facade/main.go
	CGO_ENABLED=0 GOOS=linux go build -ldflags "-w -s" -o ./public-facade-service ./cmd/public-facade/main.go

# Clean binaries
.PHONY: clean
clean:
	rm ./crm-facade-service
	rm ./public-facade-service

# Lint code
.PHONY: lint
lint:
	golangci-lint run --timeout=5m

# Start Gateway service locally
.PHONY: crm-facade-service
crm-facade-service:
	go run ./cmd/crm-facade/

# Start Gateway service locally
.PHONY: public-facade-service
public-facade-service:
	go run ./cmd/public-facade/

# Build Docker images
.PHONY: docker-build
docker-build:
	docker build -t pinks-agency/ecn-backend:latest .

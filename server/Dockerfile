# Build the application from source
FROM golang:1.22 AS build-stage

WORKDIR /app

COPY go.mod go.sum Makefile ./
RUN make prepare

COPY . .

RUN make build

# Deploy the application binary into a lean image
FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /

COPY --from=build-stage /app/crm-facade-service /crm-facade-service
COPY --from=build-stage /app/public-facade-service /public-facade-service

USER nonroot:nonroot

ENTRYPOINT ["/public-facade-service"]

ARG NODE_VERSION=21

FROM node:${NODE_VERSION}-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY . /app
WORKDIR /app

# Build
FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile --ignore-scripts

FROM base AS build
ENV NODE_ENV=development
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

# Run
FROM base
EXPOSE 3000

COPY --from=build /app/.output /app/.output
COPY --from=prod-deps /app/node_modules /app/node_modules

CMD [ "node", ".output/server/index.mjs" ]

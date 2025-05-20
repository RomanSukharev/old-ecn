import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const plugins = ["introspection"];

/**
 * Конфигурация генерации GraphQL схем
 */
const config: CodegenConfig = {
  schema: "../server/internal/crm-facade/schema/*.graphql",
  generates: {
    "./shared/api/schema.json": {
      schema: "../server/internal/crm-facade/schema/*.graphql",
      plugins,
    },
  },

  config: {
    minify: false,
    descriptions: true,
  },

  hooks: {
    afterOneFileWrite: ["prettier --write"],
  },
};

export default config;

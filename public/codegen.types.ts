import "dotenv/config";
import type { CodegenConfig } from "@graphql-codegen/cli";

const prependContent =
  "// Этот файл был сгенерирован автоматически. Не редактируйте вручную!\n\n" +
  "/* eslint-disable */\n";

/**
 * Конфигурация генерации GraphQL схем
 */
const config: CodegenConfig = {
  schema: "../server/internal/public-facade/schema/*.graphql",
  generates: {
    "./shared/api/generated.ts": {
      documents: "./**/*.gql",
      plugins: [
        { add: { content: prependContent } },
        "typescript",
        "typescript-operations",
        "typescript-vue-apollo",
      ],
      config: {
        withCompositionFunctions: true,
        vueCompositionApiImportFrom: "vue",
        skipTypename: true,
        useTypeImports: true,
        maybeValue: "T",
        dedupeFragments: true,
        extractAllFieldsToTypes: true,
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: "change-case-all#upperCase",
          transformUnderscore: true,
        },
      },
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

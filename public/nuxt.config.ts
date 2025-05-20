// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,
  css: ["~/shared/assets/css/main.scss"],

  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "nuxt-swiper",
    "@vee-validate/nuxt",
    "dayjs-nuxt",
    "nuxt-headlessui",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "nuxt-svgo",
    "vue-yandex-maps/nuxt",
  ],

  runtimeConfig: {
    public: {
      API_URL: "http://localhost:8001/graphql",
    },
  },

  imports: {
    dirs: ["shared/types/*", "shared/utils/*"],
  },

  // Override paths to match FSD
  dir: {
    pages: "app/routes",
    plugins: "app/plugins",
    middleware: "app/middleware",
    modules: "app/modules",
    assets: "shared/assets",
    public: "shared/public",
    static: "shared/static",
    layouts: "shared/ui/layouts",
  },

  alias: {
    assets: "./shared/assets",
    public: "./shared/public",
  },

  components: [
    {
      path: "~/shared/ui",
      pathPrefix: false,
    },
  ],

  yandexMaps: {
    apikey: "f9e20ad6-f892-406b-a4ce-ed0cd746b189",
  },

  svgo: {
    componentPrefix: "i",
    defaultImport: "component",
    autoImportPath: "~/shared/assets/icons/",
    svgoConfig: {
      plugins: [
        {
          name: "preset-default",
          params: {
            overrides: {
              removeViewBox: undefined,
            },
          },
        },
      ],
    },
  },

  compatibilityDate: "2024-07-22",
});

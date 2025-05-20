import ECNPreset from "./shared/theme/ECNPreset";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  ssr: false,
  css: ["~/shared/assets/css/main.scss", "primeicons/primeicons.css"],

  modules: [
    "@pinia/nuxt",
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@primevue/nuxt-module",
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
      API_URL: "http://localhost:8000/graphql",
      WEBSITE_URL: "http://localhost:8001",
    },
  },

  imports: {
    dirs: ["shared/types/*", "shared/utils/*"],
  },

  // Override paths to match FSD
  dir: {
    pages: "app/routes",
    layouts: "app/layouts",
    plugins: "app/plugins",
    middleware: "app/middleware",
    modules: "app/modules",
    assets: "shared/assets",
    public: "shared/public",
    static: "shared/static",
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

  tailwindcss: {
    exposeConfig: true,
    cssPath: ["~/shared/assets/css/tailwind.css", { injectPosition: "first" }],
  },

  primevue: {
    autoImport: true,
    options: {
      theme: {
        preset: ECNPreset,
        options: {
          prefix: "p",
          darkModeSelector: ".fake-app-dark",
          cssLayer: {
            name: "primevue",
            order: "tailwind-base, primevue, tailwind-utilities",
          },
        },
      },
    },
    components: {
      include: "*",
      prefix: "Prime",
      // exclude: [],
    },
  },

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

  compatibilityDate: "2024-07-19",
});

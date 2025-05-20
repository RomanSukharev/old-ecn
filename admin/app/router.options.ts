import type { RouterConfig } from "@nuxt/schema";
import { NotFound } from "~/pages/errors";

export default {
  // https://router.vuejs.org/api/interfaces/routeroptions.html#routes
  routes: (routes) => [
    ...routes, // TODO: Remove old fs-based routing, migrate to Pages layer

    // Common pages
    {
      path: "/",
      name: "dashboard",
      component: () => import("@/pages/dashboard"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/pages/login"),
      meta: {
        layout: "login",
      },
    },

    // Sales subsystem
    {
      path: "/sales/leads",
      name: "sales-leads",
      component: () => import("@/pages/leads"),
    },
    {
      path: "/sales/leads/:id",
      name: "sales-lead",
      component: () => import("@/pages/lead"),
    },
    {
      path: "/sales/contacts",
      name: "sales-contacts",
      component: () => import("@/pages/contacts"),
    },
    {
      path: "/sales/contacts/:id",
      name: "sales-contact",
      component: () => import("@/pages/contact"),
    },
    {
      path: "/sales/deals",
      name: "sales-deals",
      component: () => import("@/pages/deals"),
    },
    {
      path: "/sales/deals/:id",
      name: "sales-deal",
      component: () => import("@/pages/deal"),
    },
    {
      path: "/sales/mortgage-requests",
      name: "sales-mortgageRequests",
      component: () => import("@/pages/mortgageRequests"),
    },
    {
      path: "/sales/mortgage-requests/:id",
      name: "sales-mortgageRequest",
      component: () => import("@/pages/mortgageRequest"),
    },
    {
      path: "/sales/tasks",
      name: "sales-tasks",
      component: () => import("@/pages/tasks"),
    },
    {
      path: "/sales/meets",
      name: "sales-meets",
      component: () => import("@/pages/meets"),
    },

    // Estate subsystem
    {
      path: "/estate/properties",
      name: "estate-properties",
      component: () => import("@/pages/properties"),
    },
    {
      path: "/estate/properties/:id",
      name: "estate-property",
      component: () => import("@/pages/property"),
    },
    {
      path: "/estate/complexHouses",
      name: "estate-complexHouses",
      component: () => import("@/pages/complexHouses"),
    },
    {
      path: "/estate/complexHouses/:id",
      name: "estate-complexHouse",
      component: () => import("@/pages/complexHouse"),
    },
    {
      path: "/estate/complexes",
      name: "estate-complexes",
      component: () => import("@/pages/complexes"),
    },
    {
      path: "/estate/complexes/:id",
      name: "estate-complex",
      component: () => import("@/pages/complex"),
    },

    {
      path: "/estate/developers",
      name: "estate-developers",
      component: () => import("@/pages/developers"),
    },
    {
      path: "/estate/villages",
      name: "estate-villages",
      component: () => import("@/pages/villages"),
    },
    {
      path: "/estate/villages/:id",
      name: "estate-village",
      component: () => import("@/pages/village"),
    },

    // Staff subsystem

    // Content subsystem

    {
      path: "/content/stories",
      name: "content-stories",
      component: () => import("@/pages/stories"),
    },

    {
      path: "/content/stories/:id",
      name: "content-story",
      component: () => import("@/pages/story"),
    },

    {
      path: "/content/reviews",
      name: "content-reviews",
      component: () => import("@/pages/reviews"),
    },

    {
      path: "/content/vacancies",
      name: "content-vacancies",
      component: () => import("@/pages/vacancies"),
    },

    {
      path: "/content/pages",
      name: "content-pages",
      component: () => import("@/pages/pages"),
    },
    // Exchange subsystem

    // Nothing matched, 404
    {
      path: "/:catchAll(.*)*",
      component: NotFound,
    },
  ],
} satisfies RouterConfig;

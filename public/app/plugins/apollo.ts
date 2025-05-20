import { defineNuxtPlugin } from "#app";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import {
  DefaultApolloClient,
  provideApolloClient,
} from "@vue/apollo-composable";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";

export default defineNuxtPlugin((nuxtApp) => {
  const apolloClient = new ApolloClient({
    // uri: process.env.GQL_HOST,
    cache: new InMemoryCache(),
    link: createUploadLink({
      uri: nuxtApp.$config.public.API_URL,
    }),
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "no-cache",
      },
      query: {
        fetchPolicy: "no-cache",
      },
      mutate: {
        fetchPolicy: "no-cache",
      },
    },
  });

  provideApolloClient(apolloClient);
  nuxtApp.vueApp.provide(DefaultApolloClient, apolloClient);
});

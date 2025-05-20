import { defineNuxtPlugin } from "#app";
import { ApolloClient, InMemoryCache, ApolloLink } from "@apollo/client/core";
import {
  DefaultApolloClient,
  provideApolloClient,
} from "@vue/apollo-composable";
import createUploadLink from "apollo-upload-client/createUploadLink.mjs";
import { setContext } from "@apollo/client/link/context";

export default defineNuxtPlugin((nuxtApp) => {
  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem("token");
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ?? "",
      },
    };
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(
      ApolloLink.from([
        createUploadLink({
          uri: nuxtApp.$config.public.API_URL,
        }),
      ]),
    ),
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

module.exports = {
  client: {
    service: {
      name: "ECN Backend",
      // URL to the GraphQL API
      url: process.env.API_URL,
    },
    // Files processed by the extension
    includes: ["**/*.vue", "**/*.ts"],
  },
};

const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./schema");
const { resolvers } = require("./resolvers");
const { menuData } = require("./data/menuData");

const formatError = (error) => {
  console.error("GraphQL Error:", error);
  return {
    message: error.message,
    path: error.path,
    ...(process.env.NODE_ENV === "development" && {
      stacktrace: error.extensions?.exception?.stacktrace,
    }),
  };
};

const loggingPlugin = {
  requestDidStart({ request }) {
    const { operationName, query } = request;

    if (operationName === "IntrospectionQuery") {
      return;
    }

    if (query) {
      console.log(`
Operation: ${operationName || "Anonymous"}
Query: ${query?.substring(0, 100)}${query?.length > 100 ? "..." : ""}
Timestamp: ${new Date().toISOString()}
      `);
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: { menuData },
  formatError,
  introspection: process.env.NODE_ENV !== "production",
  playground: process.env.NODE_ENV !== "production",
  plugins: [loggingPlugin],
});

const PORT = process.env.PORT || 4000;

server
  .listen(PORT)
  .then(({ url }) => {
    console.log(`Server ready at ${url}`);
    console.log(`GraphQL Playground available at ${url}`);
    console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  console.error("Unhandled Rejection:", error);
  process.exit(1);
});

process.on("SIGTERM", () => {
  console.log("SIGTERM received. Shutting down gracefully...");
  server.stop().then(() => {
    console.log("Server stopped.");
    process.exit(0);
  });
});

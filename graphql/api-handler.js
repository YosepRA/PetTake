const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const GraphQLDate = require('./graphql_date.js');
const {
  list,
  details,
  userPetList,
  create,
  update,
  remove,
} = require('./pet.js');
const userResolver = require('./user.js');

const { NODE_ENV, CORS_ORIGIN, CORS_CREDENTIALS, PORT } = process.env;

const port = PORT || 3000;

function resolveContext({ req }) {
  return req.isAuthenticated()
    ? {
        username: req.user.username,
      }
    : {};
}

const corsConfig =
  NODE_ENV === 'development'
    ? {
        origin: [CORS_ORIGIN, /\.ngrok\.io/],
        credentials: CORS_CREDENTIALS === 'true',
      }
    : { origin: false };

const resolvers = {
  Query: {
    petList: list,
    pet: details,
    userPetList,
  },
  Mutation: {
    petCreate: create,
    petUpdate: update,
    petDelete: remove,
    userInfoUpdate: userResolver.update,
    userChangePassword: userResolver.changePassword,
  },
  GraphQLDate,
};

async function startApolloServer(app) {
  const server = new ApolloServer({
    typeDefs: fs.readFileSync('./graphql/schema.graphql', 'utf-8'),
    resolvers,
    context: resolveContext,
  });

  await server.start();

  server.applyMiddleware({
    app,
    cors: corsConfig,
  });

  console.log(
    `🚀 Apollo server ready at http://localhost:${port}${server.graphqlPath}`,
  );

  return server;
}

module.exports = startApolloServer;

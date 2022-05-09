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

const { CORS_ORIGIN, CORS_CREDENTIALS } = process.env;

function resolveContext({ req }) {
  return req.isAuthenticated()
    ? {
        username: req.user.username,
      }
    : {};
}

const corsConfig = {
  origin: CORS_ORIGIN,
  credentials: CORS_CREDENTIALS === 'true',
};

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

  console.log(`Apollo server ready at ${server.graphqlPath}`);

  return server;
}

module.exports = startApolloServer;

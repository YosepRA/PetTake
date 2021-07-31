const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const GraphQLDate = require('./graphql_date');
const { list, details, userPetList, create, update, remove } = require('./pet');
const userResolver = require('./user');

function resolveContext({ req }) {
  return req.isAuthenticated()
    ? {
        username: req.user.username,
      }
    : {};
}

const corsConfig = {
  origin:
    process.env.CORS_ORIGIN === 'true' ||
    process.env.CORS_ORIGIN ||
    'http://localhost:8000',
  credentials: process.env.CORS_CREDENTIALS === 'true',
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

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./graphql/schema.graphql', 'utf-8'),
  resolvers,
  context: resolveContext,
});

function startApolloServer(app) {
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: corsConfig,
  });
  console.log('Apollo server is now listening...');
}

module.exports = startApolloServer;

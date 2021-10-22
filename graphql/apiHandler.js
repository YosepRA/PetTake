const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const GraphQLDate = require('./graphql_date');
const { list, details, userPetList, create, update, remove } = require('./pet');
const userResolver = require('./user');

const { NODE_ENV, CORS_ORIGIN, CORS_CREDENTIALS } = process.env;

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

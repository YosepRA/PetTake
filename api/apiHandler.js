const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const GraphQLDate = require('./graphql_date');
const { list, details, userPetList, create, update, remove } = require('./pet');

function resolveContext({ req }) {
  return req.isAuthenticated()
    ? {
        username: req.user.username,
      }
    : {};
}

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
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
  context: resolveContext,
});

function startApolloServer(app) {
  server.applyMiddleware({
    app,
    path: '/graphql',
    cors: {
      origin: 'http://localhost:8000',
      credentials: true,
    },
  });
  console.log('Apollo server is now listening...');
}

module.exports = startApolloServer;

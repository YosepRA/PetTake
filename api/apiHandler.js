const { ApolloServer } = require('apollo-server-express');
const fs = require('fs');

const GraphQLDate = require('./graphql_date');
const { list, details, userPetList, add, update, remove } = require('./pet');

const resolvers = {
  Query: {
    petList: list,
    pet: details,
    userPetList,
  },
  Mutation: {
    petAdd: add,
    petUpdate: update,
    petDelete: remove,
  },
  GraphQLDate,
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync('./schema.graphql', 'utf-8'),
  resolvers,
});

function startApolloServer(app) {
  server.applyMiddleware({
    app,
    path: '/graphql',
  });
  console.log('Apollo server is now listening...');
}

module.exports = startApolloServer;

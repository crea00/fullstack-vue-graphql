const { ApolloServer, gql } = require('apollo-server');

const todos = [
  { task: 'Wash car', completed: false },
  { task: 'Clean Room', completed: true }
];

const typeDefs = gql`

type Query {
  task: String
  completed: Boolean
}

`;

const server = new ApolloServer({
  typeDefs: typeDefs
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
});

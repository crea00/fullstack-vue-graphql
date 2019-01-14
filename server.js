const { ApolloServer, gql } = require('apollo-server');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.error(err));

const todos = [
  { task: 'Wash car', completed: false },
  { task: 'Clean Room', completed: true },
];

const typeDefs = gql`
  type Query {
    getTodos: [Todo]
  }

  type Todo {
    task: String
    completed: Boolean
  }
`;

const server = new ApolloServer({
  typeDefs
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
});

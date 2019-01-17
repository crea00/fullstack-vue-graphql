const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Import typeDefs and resolvers
const filePath = path.join(__dirname, 'typeDefs.gql');
const typeDefs = fs.readFileSync(filePath, 'utf-8');
const resolvers = require('./resolvers');

// Import Environment Variables and Mongoose Models
require("dotenv").config();
const User = require('./models/User.js');
const Post = require('./models/Post.js');

// Connect to MLab Database
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('DB Connected!'))
  .catch(err => console.error(err));
// Set userCreateIndex
mongoose.set('useCreateIndex', true);

// Create Apollo/GraphQL server using typeDefs, resolvers, and context object
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    User,
    Post
  }
});

server.listen().then(({ url }) => {
  console.log(`Server listening on ${url}`)
});

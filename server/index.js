const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const schema = require('./schema');

// like db
const users = [{ id: 0, username: 'Name', age: 21 }];

const app = express();

app.use(cors());

const rootValue = {
  getAllUsers() {
    return users;
  },
  getUserById({ id }) {
    return users.find(user => +user.id === +id);
  },
  createUser({ input }) {
    const id = Date.now();
    const newUser = { id, ...input };

    users.push(newUser);

    return newUser;
  },
};

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema,
    rootValue,
  }),
);

app.listen(2121, () => console.log(`The server has been started ✨`));

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL's schema language
let schema = buildSchema(`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Delivery {
    id: ID!
    description: String!
    weight: Float!
    status: String!
  }

  type Query {
    user(id: ID!): User
    delivery(id: ID!): Delivery
  }
`);

// The root provides a resolver function for each API endpoint
let root = {
    user: ({id}) => {
      // Fetch user from the database by id
      // For now, we'll just return a dummy user
      return {
        id: id,
        name: 'John Doe',
        email: 'john.doe@example.com',
      };
    },
    delivery: ({id}) => {
      // Fetch delivery from the database by id
      // For now, we'll return a dummy delivery
      return {
        id: id,
        description: 'Parcel 1',
        weight: 500,
        status: 'Delivered',
      };
    },
  };

const app = express();

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));

const express = require('express');
const cors = require('cors');




const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');


const resolvers = require('./resolvers');

// Define your schema
const schema = buildSchema(`
  type Query {
    user(id: Int!): User
    delivery(id: Int!): Delivery
    userByCriteria(criteria: CriteriaInput!): User
    deliveryByCriteria(criteria: CriteriaInput!): Delivery
  }

  type Mutation {
    createUser(user: UserInput!): User
    createDelivery(delivery: DeliveryInput!): Delivery
    updateUser(id: Int!, updatedAttributes: UserInput!): User
    updateDelivery(id: Int!, updatedAttributes: DeliveryInput!): Delivery
    deleteUserById(id: Int!): String
    deleteDeliveryById(id: Int!): String
  }

  type User {
    id: Int
    name: String
    email: String
    address: String
    phone: String
    # ... other fields
  }

  type Delivery {
    id: Int
    description: String
    status: String
    delivery_address: String
    delivery_date: String
    recipient_id: String
    notes: String
    cost: String
    # ... other fields
  }

  input UserInput {
    id: Int
    name: String!
    email: String!
    address: String
    phone: String
    # ... other fields
  }

  input DeliveryInput {
    id: Int
    description: String!
    status: String
    delivery_address: String
    delivery_date: String
    recipient_id: String
    notes: String
    cost: String
    # ... other fields
  }

  input CriteriaInput {
    attribute: String!
    value: String!
  }
`);

// Create an Express server
const app = express();
app.use(cors());
// Configure the GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true, // Enable GraphiQL interface for testing
  })
);

// Start the server
app.listen(4000, () => {
  console.log('Server is running on http://localhost:4000/graphql');
});

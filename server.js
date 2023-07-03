
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
    
    deleteUserById(id: Int!): String
    deleteDeliveryById(id: Int!): String
  }

  type User {
    id: Int
    name: String
    email: String
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


// // Create an Express server

const app = express();
app.use(cors());



app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: (error) => {
      console.log(error);
      return error;
    },
  })
);



// Assign the io instance to app for access in resolvers and other files


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/graphql`);
});




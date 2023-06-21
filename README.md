# Delivery-App
This project is meant to be a simple delivery app, to develop and practice skills in GraphQL and various AWS services. It is currently a work in progress - my outline is as follows:

1 - Set up AWS infrastructure (EC2 and DynamoDB) using Terraform. 

2 - Establish a simple Node.js + Express.js server on the EC2 instance and create a GraphQL schema for the API.

3 - Create simple baseline read and create functions for the User and Delivery tables in DynamoDB to ensure connectivity. 

------ here

4 - Finish adding all CRUD operations. This includes finalizing the kind of data we want stored in each table. 

5 - Implement GraphQL resolvers for basic operations. This includes operations like creating a new delivery, and marking a delivery as completed.

6 - Since Kafka does not have a free tier, I will use Amazon SNS as a pub/sub messaging service - and implement the ability for real-time updates

7 - Build a frontend with React for the user to interact with GraphQL API.



# How It's Made:
Tech used: GraphQL, Node.js, Express.js, AWS EC2, AWS DynamoDB, Terraform 

# Optimizations
So far, there is simply a baseline of tables for the API, for future projects - more thought could be given to what each table needs ahead of time rather than before. 

# Lessons Learned:
So far, the most important lesson I've learned is to properly keep track of key pairs as an instance is created - having to create a new instance because the inital pair was not downloaded added a lot of extra time. 




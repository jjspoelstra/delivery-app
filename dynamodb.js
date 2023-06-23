const AWS = require('aws-sdk')

//set the region
AWS.config.update({ region: 'us-east-2' })

//create a service object
const dynamodb = new AWS.DynamoDB.DocumentClient()

//table for Users
const getUserById = async (id) => {
   const params = {
    TableName: 'Users',
    Key: {
        id: Number(id), // Convert id to number
      },
   };
   try {
    const data = await dynamodb.get(params).promise()
    console.log('User:', data.Item)
   } catch (error) {
    console.error('Error getting user', error)
   }
}

const getDeliveryById = async (id) -> {
   const params = {
      TableName: 'Deliveries',
      Item: {
         id: Number(id),
      },
   };
   try {
      const data = await dynamodb.get(params).promise()
      console.log('Delivery:' data.Item)
   } catch (error) {
      console.error('Error getting user', error)
   }
}

const createUser = async (user) => {
   const paramas = {
      TableName: 'User',
      Item: {
         ...user,
         id: Number(user.id), 
      },
   };

   try {
      await dynamodb.put(params).promise()
      console.log('User created successfully.')
   } catch (error) {
      console.error("Error creating delivery:', error)
      }
   }

const createDelivery = async (delivery) => {
    const params = {
      TableName: 'Deliveries',
      Item: {
        ...delivery,
        id: Number(delivery.id), // Convert id to number
      },
    };
  
    try {
      await dynamodb.put(params).promise();
      console.log('Delivery created successfully.');
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  };
  
  // Call the functions as needed
  getUserById('01');
   getDeliveryById('01')
//   createDelivery({
//     id: '456',
//     description: 'Example delivery',

//   });

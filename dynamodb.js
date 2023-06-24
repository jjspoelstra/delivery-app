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

const getDeliveryById = async (id) => {
   const params = {
      TableName: 'Deliveries',
      Key: {
         id: Number(id),
      },
   };
   try {
      const data = await dynamodb.get(params).promise()
      console.log('Delivery:', data.Item)
   } catch (error) {
      console.error('Error getting user', error)
   }
}

const createUser = async (user) => {
   const params = {
      TableName: 'Users',
      Item: {
         ...user,
         id: Number(user.id), 
      },
   };

   try {
      await dynamodb.put(params).promise()
      console.log('User created successfully.')
   } catch (error) {
      console.error('Error creating delivery:', error)
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

  //update the user
  const updateUser = async (id, updatedAttributes) => {
   const params = {
     TableName: 'Users',
     Key: {
       id: Number(id),
     },
     UpdateExpression: 'SET #name = :name, #email = :email, #address = :address, #phone = :phone',
     ExpressionAttributeNames: {
       '#name': 'name',
       '#email': 'email',
       '#address': 'address',
       '#phone': 'phone',
     },
     ExpressionAttributeValues: {
       ':name': updatedAttributes.name,
       ':email': updatedAttributes.email,
       ':address': updatedAttributes.address,
       ':phone': updatedAttributes.phone,
     },
     ReturnValues: 'ALL_NEW',
   };
 
   try {
     const data = await dynamodb.update(params).promise();
     console.log('User updated successfully. New attributes:', data.Attributes);
   } catch (error) {
     console.error('Error updating user:', error);
   }
 };

 const updateDelivery = async (id, updatedAttributes) => {
   const params = {
     TableName: 'Deliveries',
     Key: {
       id: Number(id),
     },
     UpdateExpression: 'SET #description = :description, #status = :status, #delivery_address = :deliveryAddress, #delivery_date = :deliveryDate, #recipient_id = :recipientId, #notes = :notes, #cost = :cost',
     ExpressionAttributeNames: {
       '#description': 'description',
       '#status': 'status',
       '#delivery_address': 'delivery_address',
       '#delivery_date': 'delivery_date',
       '#recipient_id': 'recipient_id',
       '#notes': 'notes',
       '#cost': 'cost',
     },
     ExpressionAttributeValues: {
       ':description': updatedAttributes.description,
       ':status': updatedAttributes.status,
       ':deliveryAddress': updatedAttributes.delivery_address,
       ':deliveryDate': updatedAttributes.delivery_date,
       ':recipientId': updatedAttributes.recipient_id,
       ':notes': updatedAttributes.notes,
       ':cost': updatedAttributes.cost,
     },
     ReturnValues: 'ALL_NEW',
   };
 
   try {
     const data = await dynamodb.update(params).promise();
     console.log('Delivery updated successfully. New attributes:', data.Attributes);
   } catch (error) {
     console.error('Error updating delivery:', error);
   }
 };
 
 const deleteUserById = async (id) => {
   const params = {
     TableName: 'Users',
     Key: {
       id: Number(id), // Convert id to number
     },
   };
 
   try {
     await dynamodb.delete(params).promise();
     console.log('User deleted successfully.');
   } catch (error) {
     console.error('Error deleting user:', error);
   }
 };
 
 // Delete a delivery by ID
 const deleteDeliveryById = async (id) => {
   const params = {
     TableName: 'Deliveries',
     Key: {
       id: Number(id), // Convert id to number
     },
   };
 
   try {
     await dynamodb.delete(params).promise();
     console.log('Delivery deleted successfully.');
   } catch (error) {
     console.error('Error deleting delivery:', error);
   }
 };
  
  // Call the functions as needed
  //getUserById('02');
  createUser({
    id: '03',
    name: 'Joe',
    email: 'jjspoels@gmail.com',
    address: '123 5th Street',
    phone: '123-456-7890',

  });
   //getDeliveryById('457')
  createDelivery({
    id: '467',
    description: 'Example delivery',
    status: 'Pending',
    delivery_address: '123 5th Street',
    delivery_date: '6/28/2023',
    recipient_id: '02',
    notes: 'ring the doorbell',
    cost: '54.55',
   
  });


  updateUser('02', {
   name: 'Updated Name',
   email: 'updated@example.com',
   address: '456 Main Street',
   phone: '987-654-3210',
 });

 updateDelivery('457', {
   description: 'Updated Description',
   status: 'In Progress',
   delivery_address: '456 Main Street',
   delivery_date: '6/30/2023',
   recipient_id: '03',
   notes: 'Leave package at front desk',
   cost: '65.00',
 });

 deleteUserById('01');
deleteDeliveryById('457');
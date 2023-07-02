const AWS = require('aws-sdk')

//set the region
AWS.config.update({ region: 'us-east-2' })

//create a service object
const dynamodb = new AWS.DynamoDB.DocumentClient()

//table for Users

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
      return user
   } catch (error) {
      console.error('Error creating user:', error)
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
       return delivery
    } catch (error) {
       console.error('Error creating delivery:', error);
    }
 };

 const getUserById = async (id) => {
  const params = {
    TableName: 'Users',
    Key: {
      id: id,
    },
  };

  try {
    const data = await dynamodb.get(params).promise();
    console.log('User:', data.Item);
    return data.Item;
  } catch (error) {
    console.error('Error getting user:', error);
    return new Error(error);
  }
  
};


const getDeliveryById = async (id) => {
  const params = {
    TableName: 'Deliveries',
    Key: {
      id: id,
    },
  };

  try {
    const data = await dynamodb.get(params).promise();
    console.log('Delivery:', data.Item);
    return data.Item;
  } catch (error) {
    console.error('Error getting user:', error);
    throw error; // Throw the error after logging it
  }
  
};

  //update the user ----functions not working
//   const updateUser = async (id, updatedAttributes) => {
//     const { name, email, address, phone } = updatedAttributes;
//     const params = {
//       TableName: 'Users',
//       Key: { id: Number(id) },
//       UpdateExpression: 'SET #n = :name, email = :email, address = :address, phone = :phone',
//       ExpressionAttributeNames: {
//         '#n': 'name',
//       },
//       ExpressionAttributeValues: {
//         ':name': name,
//         ':email': email,
//         ':address': address,
//         ':phone': phone,
//       },
//       ReturnValues: 'ALL_NEW',
//     };
  
//     try {
//       const data = await dynamodb.update(params).promise();
//       console.log('User updated successfully:', data.Attributes);
//       return data.Attributes;
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };
  
  
  
  

//  const updateDelivery = async (id, updatedAttributes) => {
//    const params = {
//      TableName: 'Deliveries',
//      Key: {
//        id: Number(id),
//      },
//      UpdateExpression: 'SET #description = :description, #status = :status, #delivery_address = :deliveryAddress, #delivery_date = :deliveryDate, #recipient_id = :recipientId, #notes = :notes, #cost = :cost',
//      ExpressionAttributeNames: {
//        '#description': 'description',
//        '#status': 'status',
//        '#delivery_address': 'delivery_address',
//        '#delivery_date': 'delivery_date',
//        '#recipient_id': 'recipient_id',
//        '#notes': 'notes',
//        '#cost': 'cost',
//      },
//      ExpressionAttributeValues: {
//        ':description': updatedAttributes.description,
//        ':status': updatedAttributes.status,
//        ':deliveryAddress': updatedAttributes.delivery_address,
//        ':deliveryDate': updatedAttributes.delivery_date,
//        ':recipientId': updatedAttributes.recipient_id,
//        ':notes': updatedAttributes.notes,
//        ':cost': updatedAttributes.cost,
//      },
//      ReturnValues: 'ALL_NEW',
//    };
 
//    try {
//      const data = await dynamodb.update(params).promise();
//      console.log('Delivery updated successfully. New attributes:', data.Attributes);
//    } catch (error) {
//      console.error('Error updating delivery:', error);
//    }
//  };
 
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

 const listUsers = async () => {
   const params = {
     TableName: 'Users',
   };
 
   try {
     const data = await dynamodb.scan(params).promise();
     console.log('Users:', data.Items);
   } catch (error) {
     console.error('Error listing users:', error);
   }
 };
 
 const listDeliveries = async () => {
   const params = {
     TableName: 'Deliveries',
   };
 
   try {
     const data = await dynamodb.scan(params).promise();
     console.log('Deliveries:', data.Items);
   } catch (error) {
     console.error('Error listing deliveries:', error);
   }
 };

 const getUsersByCriteria = async (criteria) => {
  const params = {
    TableName: 'Users',
    FilterExpression: '#attribute = :value',
    ExpressionAttributeNames: {
      '#attribute': criteria.attribute,
    },
    ExpressionAttributeValues: {
      ':value': criteria.value,
    },
  };

  try {
    const data = await dynamodb.scan(params).promise();
    console.log('Users:', data.Items);
    return data.Items[0];
  } catch (error) {
    console.error('Error getting users', error);
  }
};


 
 // Example usage:
 

 const getDeliveriesByCriteria = async (criteria) => {
   const params = {
     TableName: 'Deliveries',
     FilterExpression: '#attribute = :value',
     ExpressionAttributeNames: {
       '#attribute': criteria.attribute,
     },
     ExpressionAttributeValues: {
       ':value': criteria.value,
     },
   };
 
   try {
     const data = await dynamodb.scan(params).promise();
     console.log('Deliveries:', data.Items);
     return data.Items[0]
   } catch (error) {
     console.error('Error getting deliveries', error);
     return new Error(error)
   }
 };
 
 // Example usage:
 
 
  
  // Call the functions as needed

  //getUserById('02');

//   createUser({
//     id: '03',
//     name: 'Joe',
//     email: 'jjspoels@gmail.com',
//     address: '123 5th Street',
//     phone: '123-456-7890',
//   });

   //getDeliveryById('457')
//   createDelivery({
//     id: '467',
//     description: 'Example delivery',
//     status: 'Pending',
//     delivery_address: '123 5th Street',
//     delivery_date: '6/28/2023',
//     recipient_id: '02',
//     notes: 'ring the doorbell',
//     cost: '54.55',
//   });

//   updateUser('02', {
//    name: 'Updated Name',
//    email: 'updated@example.com',
//    address: '456 Main Street',
//    phone: '987-654-3210',
//  });

//  updateDelivery('457', {
//    description: 'Updated Description',
//    status: 'In Progress',
//    delivery_address: '456 Main Street',
//    delivery_date: '6/30/2023',
//    recipient_id: '03',
//    notes: 'Leave package at front desk',
//    cost: '65.00',
//  });

//  deleteUserById('01');

// deleteDeliveryById('457');

// listUsers();

// listDeliveries();


// getDeliveryById(467);



module.exports = {
  createUser,
  createDelivery,
  getUserById,
  getDeliveryById,
  updateUser,
  updateDelivery,
  deleteUserById,
  deleteDeliveryById,
  listUsers,
  listDeliveries,
  getUsersByCriteria,
  getDeliveriesByCriteria,
};




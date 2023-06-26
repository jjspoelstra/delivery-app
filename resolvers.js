const {
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
    getDeliveriesByCriteria
  } = require('./dynamodb');
  
  const resolvers = {
    Query: {
        user: async (_, { id }) => {
            console.log('Resolver function for user executed');
            return { id: 3, name: 'Sample User', email: 'sample@example.com', address: '123 Main St', phone: '123-456-7890' };
          },        
      delivery: (_, { id }) => getDeliveryById(id),
      userByCriteria: (_, { criteria }) => getUsersByCriteria(criteria),
      deliveryByCriteria: (_, { criteria }) => getDeliveriesByCriteria(criteria),
    },
    Mutation: {
      createUser: (_, { user }) => createUser(user),
      createDelivery: (_, { delivery }) => createDelivery(delivery),
      updateUser: (_, { id, updatedAttributes }) => updateUser(id, updatedAttributes),
      updateDelivery: (_, { id, updatedAttributes }) => updateDelivery(id, updatedAttributes),
      deleteUserById: (_, { id }) => deleteUserById(id),
      deleteDeliveryById: (_, { id }) => deleteDeliveryById(id),
    },
  };
  
  module.exports = resolvers;
  
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
  
const queries = {
    user: async ({ id }) => {
        console.log('Resolver function for user executed');
        return getUserById(id);
    },
    delivery: ({ id }) => getDeliveryById(id),
    userByCriteria: ({ criteria }) => getUsersByCriteria(criteria),
    deliveryByCriteria: ({ criteria }) => getDeliveriesByCriteria(criteria),
};

const mutations = {
    createUser: ({ user }) => createUser(user),
    createDelivery: ({ delivery }) => createDelivery(delivery),
    // updateUser: ({ id, updatedAttributes }) => updateUser(id, updatedAttributes),
    // updateDelivery: ({ id, updatedAttributes }) => updateDelivery(id, updatedAttributes),
    deleteUserById: ({ id }) => deleteUserById(id),
    deleteDeliveryById: ({ id }) => deleteDeliveryById(id),
}

const resolvers = { ...queries, ...mutations };

module.exports = resolvers;
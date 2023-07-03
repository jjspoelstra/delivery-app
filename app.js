const socket = io()

socket.on('deliveryInitiated', (delivery) =>{
    alert('delivery initialized!')
})
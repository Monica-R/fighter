import store from './store/store.js'

// Configuración del servidor de Socket.IO, el servidor HTTP y el servidor de Express
const Express = require('express')
const Http = require('http')
const SocketIO = require('socket.io')

const app = Express()
const server = Http.createServer(app)
const io = SocketIO(server, {
  cors: {
    origin: '*'
  }
})

server.listen(3000, () => console.info('Listening on port 3000...'))

// Conectar los clientes con el servidor de Socket.IO
io.on('connection', socket => {
  const client = { id: socket.id }
  store.commit('ADD_CLIENT', client)
  console.log(`New client connected: ${socket.id}`)
  // Enviar al cliente la información de la partida
  socket.emit('gameInfo', store.state)
  // Manejar la desconexión de un cliente
  socket.on('disconnect', () => {
    store.commit('REMOVE_CLIENT', socket.id)
    console.log(`Client disconnected: ${socket.id}`)
  })
  // socket.on('serverMessage', data => console.log(`Received message from client ${socket.id}:`, data))
})

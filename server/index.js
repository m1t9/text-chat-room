const http = require('http');
const express = require('express');
const cors = require('cors');
const { Server } = require('socket.io');
const CONSTANTS = require('./CONSTANTS.js');

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT || 5000;
const connectedUsers = {};

app.use(cors());

app.get('/', (req, res) => {
  res.send({ response: 'Server is up and running.' }).status(200);
});

io.on(CONSTANTS.CONNECTION, (socket) => {
  console.log(`Client ${socket.id} connected`);

  // Join a conversation
  const { roomId, userName } = socket.handshake.query;
  socket.join(roomId);

  // Listen for new messages
  socket.on(CONSTANTS.NEW_CHAT_MESSAGE_EVENT, (data) => {
    io.in(roomId).emit(CONSTANTS.NEW_CHAT_MESSAGE_EVENT, data);
  });

  // Add new user
  connectedUsers[roomId] = (roomId in connectedUsers) ? connectedUsers[roomId].concat(userName) : [userName];
  socket.on(CONSTANTS.CONNECTED_USERS, () => {
    io.in(roomId).emit(CONSTANTS.CONNECTED_USERS, connectedUsers);
  });

  // Leave the room if the user closes the socket
  // Delete user
  socket.on(CONSTANTS.DISCONNECT, () => {

    connectedUsers[roomId].splice(connectedUsers[roomId].indexOf(userName), 1);
    io.in(roomId).emit(CONSTANTS.CONNECTED_USERS, connectedUsers);
    console.log(`Client ${socket.id} diconnected`);
    socket.leave(roomId);
  });
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
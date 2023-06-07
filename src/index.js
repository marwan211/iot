const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();


const server = http.createServer(app);
const port = process.env.PORT || 5000;

const io = new Server(server, {
  cors: {
   origin: "*",
   methods: ["GET", "POST"],
   
   credentials: true,
  },
  transports: [
    'websocket', 
    'flashsocket', 
    'htmlfile', 
    'xhr-polling', 
    'jsonp-polling', 
    'polling'
  ],
   allowEIO3: false,
   serveClient: true,
  });

let brightness = 0;
io.on('connection', (socket) => {
  console.log('New WebSocket connection');
  socket.emit('brightness', brightness);
  socket.on('brightness', (newBrightness) => {
    brightness = newBrightness;
    console.log('Brightness updated:', brightness);
    io.emit('brightness', brightness);
  });
});
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
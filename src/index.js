const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const app = express();

app.use(cors({
  origin: '*'
}));
const server = http.createServer(app);
const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
const io = new Server(server, {
  cors: {
   origin: "*",
   methods: ["GET", "POST"],
   transports: ["websocket", "polling"],
   credentials: true,
  },
   allowEIO3: true,
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
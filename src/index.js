
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

// Initialize the Express app
const app = express();
const server = http.createServer(app);

// Enable CORS for Socket.IO
app.use(cors());

// Start the server
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Initialize Socket.IO
const io = new Server(server);
let brightness = 0;

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  // Get the current LED brightness and send it to the client
  socket.emit('brightness', brightness); // Assuming initial brightness is 0

  // Listen for changes in brightness from the client
  socket.on('brightness', (newBrightness) => {
    // Update the brightness value
    brightness = newBrightness;

    // Log the updated brightness value
    console.log('Brightness updated:', brightness);

    // You can add your code here to control the Arduino LED based on the brightness value
    // For example, you can use the 'johnny-five' library to communicate with the Arduino over a serial port
    // to adjust the LED brightness accordingly
  });
});

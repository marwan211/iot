const express = require('express');
const SocketIO = require('socket.io');

// Initialize the Express app
const app = express();

// Start the server
const server = app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

// Initialize Socket.io
const io = SocketIO(server);

// Handle incoming WebSocket connections
io.on('connection', (socket) => {
  console.log('New WebSocket connection');

  // Get the current LED brightness and send it to the client
  socket.emit('brightness', 0); // Assuming initial brightness is 0

  // Listen for changes in brightness from the client
  socket.on('brightness', (brightness) => {
    // You can replace this part with your own logic to control the Arduino LED
    // For example, you can use the 'johnny-five' library to communicate with the Arduino over a serial port

    // Here's a simple example to log the brightness value
    console.log('Brightness updated:', brightness);

    // You can add your code here to control the Arduino LED based on the brightness value
    // For example, you can use the 'johnny-five' library to communicate with the Arduino over a serial port
    // to adjust the LED brightness accordingly
  });
});
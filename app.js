const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Middleware to handle JSON requests
app.use(express.json());

// Endpoint to emit a message to all connected sockets
app.post('/send-message', (req, res) => {
    const { message } = req.body;
    io.emit('new message', message);
    res.send({ status: 'Message sent' });
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('a user connected');

    // Example: Listen for a specific event from the socket
    socket.on('custom event', (data) => {
        console.log('Received custom event with data:', data);
    });

    // Example: Emit a message to the socket
    socket.emit('welcome', 'Welcome to the Socket.io server!');

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});

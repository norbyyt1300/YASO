const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/live', (req, res) => {
    res.sendFile(__dirname + '/live.html');
});

io.on('connection', (socket) => {
    socket.on('update', (msg) => {
        io.emit('update', msg);
    });
});

server.listen(3000, () => {
    console.log('Server started; now listening on localhost:3000...');
});

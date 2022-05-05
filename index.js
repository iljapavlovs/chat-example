//SERVER SIDE
const app = require('express')();
const http = require('http').Server(app);
//Notice that I initialize a new instance of socket.io by passing the server (the HTTP server) object.
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

//io.on - listen on the connection event for incoming sockets
io.on('connection', (socket) => {
  //when `chat message` is received from client,
  socket.on('chat message', msg => {
    // then emit new event with 'chat message'
    io.emit('chat message', msg);
  });
});

http.listen(port, () => {
  console.log(`Socket.IO server running at http://localhost:${port}/`);
});

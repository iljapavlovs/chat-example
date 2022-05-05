Socket.io is implementation of WebSockets


# TLDR

https://socket.io/get-started/chat 
Socket.IO is composed of two parts:

* A server that integrates with (or mounts on) the Node.JS HTTP Server socket.io
* A client library that loads on the browser side socket.io-client

## Socket IO Server
`1. npm install socket.io`


```js
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
//Notice that I initialize a new instance of socket.io by passing the server (the HTTP server) object.
const io = new Server(server);

//io.on - listen on the connection event for incoming sockets
io.on('connection', (socket) => {
    //when `chat message` is received from client, 
    socket.on('chat message', msg => {
        // then emit new event with 'chat message'
        io.emit('chat message', msg);
    });
});
```

OR

```js
import { Server } from "socket.io";

const io = new Server(3000);

io.on("connection", (socket) => {
  // send a message to the client
  socket.emit("hello from server", 1, "2", { 3: Buffer.from([4]) });

  // receive a message from the client
  socket.on("hello from client", (...args) => {
    // ...
  });
});
```

## Socket IO Client
```js
var socket = io();

// send EVENT with `chat message` tyoe via socket-io.client
socket.emit('chat message', input.value);

//LISTEN SOCKET - when EVENT with`chat  message` is received, then do following
socket.on('chat message', function(msg) {
    //do some stuff
});
```

or 

```js
import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");

// send a message to the server
socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

// receive a message from the server
socket.on("hello from server", (...args) => {
  // ...
});

```

# What Socket.IO is not
CAUTION
Socket.IO is NOT a WebSocket implementation.

Although Socket.IO indeed uses WebSocket for transport when possible, it adds additional metadata to each packet. That is why a WebSocket client will not be able to successfully connect to a Socket.IO server, and a Socket.IO client will not be able to connect to a plain WebSocket server either.
```
// WARNING: the client will NOT be able to connect!
const socket = io("ws://echo.websocket.org");
```
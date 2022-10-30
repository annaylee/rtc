const express = require('express');
const socket = require('socket.io');
const app = express();

// this will work on the cloud host and localhost
const port = process.env.PORT || 8080;

app.use(express.static("public"));
const server = app.listen( port, function(){
    console.log(`Server is listening on port ${port}`);
});

// attach server to the socket
const serverSocket = socket(server);

serverSocket.on("connection", function(cSocket){
    // console.log(`Connection established for Socket ${cSocket.id}`);
    // use cSocket.on() to register an event listener on the server side
    cSocket.on("chat", function(data){
        // use serverSocket.sockets (all sockets/socket collection) to emit to all clients
        serverSocket.sockets.emit("chat", data);
    });
    cSocket.on("typing", function(data){
        cSocket.broadcast.emit("typing", data);
    });
});
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

server.listen(3000);

app.get("/", function(request, response) {
  response.sendFile(__dirname + "/index.html");
});

users = [];
connections = [];

io.sockets.on("connection", socket => {
  console.log("Connection success");
  connections.push(socket);

  socket.on("disconnect", data => {
    connections.splice(connections.indexOf(socket), 1);
    console.log("disconnected");
  });

  socket.on("send mess", function(data) {
    io.sockets.emit("add mess", {
      msg: data.msg,
      name: data.name,
      className: data.className
    });
  });
});

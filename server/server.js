const express = require('express');
const path = require('path');
const http = require("http");
const WebSocket = require("ws");

const app = express();
app.use(express.static(path.join(__dirname, '..', 'client')));
app.listen(3000);

const httpServer = http.createServer();
const wss = new WebSocket.Server({ server: httpServer });
httpServer.listen(8080);

const clientConnections = {};
const opponents = {};
let clientIdsWaitingMatch = [];

function createClientId(){
    
}

wss.on("connection", connection => {
  const clientId = createClientId();
  clientConnections[clientId] = connection;

  matchClients(clientId);

  connection.on("message", message => {
    const result = JSON.parse(message);

    console.log(result);
  });

  connection.on("close", () => {
    closeClient(connection, clientId);
  });
});


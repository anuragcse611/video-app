
const WebSocketServer = require('websocket').server;
const http = require('http');

const server = http.createServer((request, response) => {
  console.log('Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(8000, () => {
  console.log('Server is listening on port 8000');
});

const wsServer = new WebSocketServer({
  httpServer: server,
});

const connections = [];

wsServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);
  connections.push(connection);
  console.log('Connection accepted');

  connection.on('message', (message) => {
    const data = JSON.parse(message.utf8Data);
    connections.forEach((c) => {
      c.sendUTF(JSON.stringify(data));
    });
  });

  connection.on('close', (reasonCode, description) => {
    console.log('Connection closed');
  });
});
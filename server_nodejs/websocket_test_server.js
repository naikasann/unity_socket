const WebSocket  = require('ws');
 
const wss = new WebSocket.Server({ port: 3000 });
 
wss.on('connection', (ws) => {
 
  console.log('Established a connection with client.');
 
  ws.on('message', (message) => {
     console.log(`Received a message from client: ${message}`);
     ws.send("Server received message.");
  });
 
setInterval(function() {
   console.log("Sended");
   wss.clients.forEach(client => {
     client.send('Send to established all client.');
  });
 }, 500);
 
});
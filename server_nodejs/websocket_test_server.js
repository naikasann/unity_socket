const WebSocket  = require('ws');
var os = require("os");
var interfaces = os.networkInterfaces();

var address_list = [];

// taken ip address for unity send data
for(var k in interfaces){
   for(var k2 in interfaces[k]){
      var address = interfaces[k][k2];
      if(address.family == "IPv4" && !address.internal){
         address_list.push(address.address);
      }
   }
}

console.log(address_list);

// craate websocket. WebSocket.Server(<IPAdress> : <Port>)
// ex :) WebSocket.Server("ws://127.0.0.1:5001")

const wss = new WebSocket.Server({ port: 3000 });

//websocketserver connection callback
wss.on('connection', (ws) => {
   console.log('Established a connection with client.');
 
   ws.on('message', (message) => {
      console.log(`Received a message from client: ${message}`);
      ws.send(address_list);
   });
 
   setInterval(function() {
      console.log("Sended");
      wss.clients.forEach(client => {
         client.send('Send to established all client.');
      });
   }, 1000);
});
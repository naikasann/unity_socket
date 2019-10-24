const WebSocket  = require('ws');
var os = require("os");
const http = require('http');
const fs = require('fs');

var interfaces = os.networkInterfaces();

function take_ipaddress(){
   var address_list = [];

// craate websocket. WebSocket.Server(<IPAdress> : <Port>)
// ex :) WebSocket.Server("ws://127.0.0.1:5001")
const wss = new WebSocket.Server({ port: 3000 });

// taken ip address for unity send data
for(var k in interfaces){
   for(var k2 in interfaces[k]){
      var address = interfaces[k][k2];
      if(address.family == "IPv4" && !address.internal){
         address_list.push(address.address);
      }
   }
   return address_list;
}

//html reader
const server = http.createServer((req, res)=>{
   //３:ファイル読み込み
   var url = req.url; //リクエストからURLを取得
   var tmp = url.split('.'); //splitで . で区切られた配列にする 
   var ext = tmp[tmp.length - 1]; //tmp配列の最後の要素(外部ファイルの拡張子)を取得
   var path = '.' + url; //リクエストされたURLをサーバの相対パスへ変換する
 
   switch(ext){
     case 'js': //拡張子がjsならContent-Typeをtext/javascriptにする
        fs.readFile(path, 'UTF-8', 
        (err,data)=>{
          res.writeHead(200,{"Content-Type":"text/javascript"});
          res.write(data)
          res.end();
        });
        break;
     case '/': //拡張子が/(index.html)だった場合はindex.htmlを返す
       fs.readFile('index.html','UTF-8',
       (error, data)=>{
         res.writeHead(200,{'Content-Type':'text/html'});
         res.write(data);
         res.end();
       })
       break
   }
 });


//websocketserver connection callback
wss.on('connection', (ws) => {
   console.log('Established a connection with client.');
 
   ws.on('message', (message) => {
      //recieve msg
      msg = `${message}`;
      console.log(msg);
      ws.send(address_list);
   });
 
   setInterval(function() {
      console.log("Sended");
      wss.clients.forEach(client => {
         client.send('Send to established all client.');
      });
   }, 1000);
});

server.listen(5001);
console.log('Server running');
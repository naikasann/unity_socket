const WebSocket  = require('ws');
const http = require('http');
const fs = require('fs');
const Crypto = require("crypto");

function getSecureRandom(){
   const buff = Crypto.randomBytes(8);  // バイナリで8byteのランダムな値を生成
   const hex  = buff.toString("hex");   // 16進数の文字列に変換
 
   return ( parseInt(hex,16) );         // integerに変換して返却
 }

//html reader
const server = http.createServer((req, res)=>{
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
       fs.readFile('html/index.html','UTF-8',
       (error, data)=>{
         res.writeHead(200,{'Content-Type':'text/html'});
         res.write(data);
         res.end();
       })
       break
   }
});

var connection_list = [];

console.log("html server running. localhost:8888")
server.listen(8888);
//websocket server 
const wss = new WebSocket.Server({ port: 3000 });
//websocketserver connection callback
wss.on('connection', (ws) => {
   console.log('Established a connection with client.');
   connection_list.push(ws);

   //console.log(connection_list);

   ws.on('message', (message) => {
      console.log(`${message}`);
      var random_motion = getSecureRandom() % 10;

      //console.log(random_motion);
      
      ws.send(random_motion);
      connection_list[0].send(random_motion);
   });
});
console.log("html websocket server running. localhost:3000")
const WebSocket  = require('ws');
const http = require('http');
const fs = require('fs');

function getSecureRandom(){
   var random_motion = Math.floor( Math.random() * 11 );
 
   return random_motion;
}

//html reader
const server = http.createServer((req, res)=>{
   var url = req.url; //リクエストからURLを取得
   var tmp = url.split('.'); //splitで . で区切られた配列にする 
   var ext = tmp[tmp.length - 1]; //tmp配列の最後の要素(外部ファイルの拡張子)を取得
   var path = '.' + url; //リクエストされたURLをサーバの相対パスへ変換する
   //console.log(path)

   switch(ext){
      case 'js': 
         fs.readFile(path, 'UTF-8', 
         (err,data)=>{
            res.writeHead(200,{"Content-Type":"text/javascript"});
            res.write(data)
            res.end();
         });
         break;
      case '/': 
         fs.readFile('html/index.html','UTF-8',
         (error, data)=>{
            res.writeHead(200,{"Content-Type":"text/html"});
            res.write(data);
            res.end();
         });
         break;
      case 'css': 
         fs.readFile(path,
         (error, data)=>{
            res.writeHead(200,{"Content-Type":"text/css"});
            res.write(data);
            res.end();
         });
         break;
      case 'png':
         fs.readFile(path ,
         (error, data)=>{
            res.writeHead(200, {"Content-Type": "image/png"});
            res.end(data);
         });
         break;
   }
});

var connection_list = [];
var motion_list = [];

var unity_send = false;

console.log("html server running. localhost:8888");
server.listen(8888);
//websocket server 
const wss = new WebSocket.Server({ port: 3000 });
//websocketserver connection callback
wss.on('connection', (ws) => {
   console.log('Established a connection with client.');
   connection_list.push(ws);
   random_motion = getSecureRandom() % 10;
   //console.log(connection_list);

   ws.on('message', (message) => {
      console.log(`${message}`);
      //unityからの送信の場合処理を行わない。
      if(ws == connection_list[0]){
         //unity側からの処理
         console.log("unity_process");
      }else{
         //デバイスからの処理
         console.log("guest deveice process")
         // モーションの数から配列がオーバーした場合。-1を送信してエラー処理を行う。
         if(motion_list.length >= 10){
            console.log("req max array...");
            ws.send(-1);
         }else{
            // 重複しないモーションの番号を探し、それを格納する。
            while(motion_list.indexOf(random_motion) >= 0){
               random_motion = getSecureRandom() % 10;
            }
            motion_list.push(random_motion);
            ws.send(random_motion);
            //send unity data...
            connection_list[0].send(String(random_motion));
         }
      }
   });
});
console.log("html websocket server running. localhost:3000")
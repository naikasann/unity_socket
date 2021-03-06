const http = require('http');
const fs = require('fs');

exports.CreateHttpServer = function () {
   const server = http.createServer((req, res)=>{
      var url = req.url; //リクエストからURLを取得
      //favicon.inoが送られてきた場合即座に返信を行う
      if(req.url == "/favicon.ico"){
         console.log("faviconino request");
         res.writeHead(200, {'Content-Type': 'image/x-icon'} );
         res.end();
      }else{
         var tmp = url.split('.'); //splitで . で区切られた配列にする 
         var ext = tmp[tmp.length - 1]; //tmp配列の最後の要素(外部ファイルの拡張子)を取得
         var path = '.' + url; //リクエストされたURLをサーバの相対パスへ変換する
         console.log(path)

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
               fs.readFile('./resource/html/index.html','UTF-8',
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
      }
   });
   console.log("http server running. localhost:80");
   server.maxHeadersCount = 1000;
   server.listen(80);
}
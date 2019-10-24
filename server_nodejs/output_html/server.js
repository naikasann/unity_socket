//１:モジュールのロード
const http = require('http');
const fs = require('fs');

//２:サーバーオブジェクトの作成
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

//４:待ち受け開始
server.listen(3000);
console.log('Server running');
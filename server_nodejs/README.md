# Server_nodejs

## システム概要

unity_socketのnodejs部分。
htmlとwebsocket serverを同時に立て、htmlの閲覧部分とwebsocketで通信してデータをやりとりする部分を行う。

## システム構成

### Unity(maindomain, Webcoket Client) <=> nodejs(Websocket Server , html Sever) <= Userの端末(htmlで閲覧する)

この構成のシーケンスは以下の通りである。

1. nodejs で html server と Websocket server を生成する
2. unityが nodejs と接続する
3. ユーザーが webbrawser で html Server にアクセス
4. ユーザーが登録申請ボタンを入力する
5. nodejs が識別のための指示IDを　websocket　で unity, html(js)に送信する。**(ここまで完成)**
6. ユーザーが指示を行い検出する
7. unity が検出した際に　html(js) に識別完了のコードを送る。html に次の指示を表示する。
8. ユーザーが次の指示を行う
9. unityはそれを識別し、対応ページを送信する

このNodejs部分を作成している。

## ファイル構成

* ./execute.bat --- windows用のnodejsを実行バッチ
* ./main.js --- サーバーを実行するnodejsプログラム
* /node_js --- nodejsのプログラムを格納しているフォルダ
  - /http_server.js --- http(html)の通信を行うためのサーバーを構築するためのNodeJsプログラム
  - /websocket_server.js --- websocket通信を行うためのサーバーを構築するためのNodeJSプログラム
* /npm_package --- nodejsで使用するパッケージをインストールするためのpackage-jsonが格納されている
* /resource --- htmlサーバーで使用する画像ファイルなどが格納されているフォルダ
  - /css --- htmlサーバーで参照するcssファイルを格納するフォルダ (index,) 
  - /html --- htmlファイルで参照するhtmlファイルを格納するフォルダ (index,)
  - /js --- htmlファイルで参照するjsファイルを格納するフォルダ（websocket部分,buttonpushしたときのアクション）
  - /img --- htmlの表示用の画像を保存しておくフォルダ(~~~.png)
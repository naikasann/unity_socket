# unity_socket

## システム概要

unityとhrml(flask)の二つのwebsocketを使用して双方向通信を行う。

## 作成するシステム構成

### Unity <=> (websocket) <=> flask(html)

この構成のシーケンスは以下の通りである。

1. まずはflaskないで生成したボタンからUnityにリクエストを送信する
2. リクエストをUnityが受け取るとランダムな数値をflaskに返信する
3. flaskはそれを受け取り、htmlに変更を加える。(javascriptを使用しないといけなくなるはず)
4. Unity側はそれを送信した人を特定して値を返信する。（？？）

## 現在のファイル構成

* /server_nodejs

nodejsでwebsocketserverを作成し、データをクライアントに送信し続ける。nodejsをインストールしてある状態で

```/server_nodejs $ node websocket_test_server.js```

で実行を行うことができる。現在はデバッグ用として採用中。

* /websocket_for_unity_to_js

unityのプロジェクトファイル
現在はクライアントデータのスクリプトがあり、sをキーボード入力するとデータをsendし、レシーブデータはDebug.Logで表示されている。


* websocket-shape.dll

Unity内のasetに入れておくことでwebsocket通信を行うことができる。[github](https://github.com/sta/websocket-sharp)から取得してビルドが現在の環境からでは不可能だったで過去データから掘り起こした。

### 参考URL
1. [UnityでWebSocketを使用する - Qiita](https://qiita.com/oishihiroaki/items/bb2977c72052f5dd5bd9)
2. [[Unity]Unity で WebSocket ライブラリを用いてリアルタイム通信する | プライムストラクチャーのTECHLOG](https://techblog.primestructure.co.jp/2019/06/28/unity-%E3%81%A7-websocket-%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E9%80%9A%E4%BF%A1%E3%81%99%E3%82%8B/)
3. [5分で動かせるwebsocketのサンプル3つ - Qiita](https://qiita.com/okumurakengo/items/a8ccea065f5659d1a1de)
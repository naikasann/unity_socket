# unity_socket

## システム概要

unityとhrml(flask)の二つのwebsocketを使用して双方向通信を行う。

## 作成するシステム構成

### Unity(maindomain, webcoket) <=> nodejs(websocket, html生成) <= htmlで閲覧する

この構成のシーケンスは以下の通りである。

1. nodejsでhtmlを生成し、アクセスする。
2. websocket方式でUnityにipaddressを通信する。
3. 送られてきたipaddressにランダムな値を返信する。
4. 受け取ったデータを表示する。

## 現在のファイル構成

* /server_nodejs

nodejsでwebsocketserverを作成し、データをクライアントに送信し続ける。nodejsをインストールしてある状態で

```/server_nodejs $ node websocket_test_server.js```

* /websocket_for_unity_to_js

unityのプロジェクトファイル
現在はクライアントデータのスクリプトがあり、sをキーボード入力するとデータをsendし、レシーブデータはDebug.Logで表示されている。


* websocket-shape.dll

Unity内のasetに入れておくことでwebsocket通信を行うことができる。[github](https://github.com/sta/websocket-sharp)から取得してビルドすると生成されるが,
現在の環境からでは不可能だったで過去データから掘り起こした。

## 各種開発中環境

* Unity  --- 2019.2.9f(Unity Hub)
* NodeJS --- v10.16.3

### 参考URL
1. [UnityでWebSocketを使用する - Qiita](https://qiita.com/oishihiroaki/items/bb2977c72052f5dd5bd9)
2. [[Unity]Unity で WebSocket ライブラリを用いてリアルタイム通信する | プライムストラクチャーのTECHLOG](https://techblog.primestructure.co.jp/2019/06/28/unity-%E3%81%A7-websocket-%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E9%80%9A%E4%BF%A1%E3%81%99%E3%82%8B/)
3. [5分で動かせるwebsocketのサンプル3つ - Qiita](https://qiita.com/okumurakengo/items/a8ccea065f5659d1a1de)
4. [Node.jsでローカルIPアドレスを取得する方法 - コードログ](https://codeday.me/jp/qa/20190313/372296.html)
---妥当性がない恐れある。
5. [Node.jsでコンピュータのネットワークアドレスを取得する | 情報アイランド](http://info-i.net/os-network-interfaces)
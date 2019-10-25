# unity_socket

## システム概要

unityとnode jsののwebsocketを使用して双方向通信を行う。
またnode jsでhttpサーバーを構築してユーザーとunityがリアルタイムで同期できる仕組みを構築する。

## 作成するシステム構成

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

## 現在のファイル構成

* /server_nodejs

nodejsでwebsocketserverとhttpサーバーを構築し、データの処理を行う。
nodejsをインストールしてある状態で

```/server_nodejs $ node websocket_test_server.js```

で実行することができる

* /websocket_for_unity_to_js

unityのプロジェクトファイル
websocket clientのスクリプトが入っている。

* websocket-shape.dll

Unity内のasetに入れておくことでwebsocket通信を行うことができる。[github](https://github.com/sta/websocket-sharp)から取得してビルドすると生成されるが,
現在の自分の周辺環境からでは不可能だったで過去データから掘り起こした。

## 各種開発中環境

* Unity  --- 2019.2.9f(Unity Hub)
* NodeJS --- v10.16.3


## nqmのメモ(nodejsのパッケージ管理)

nqmはnodejsのパッケージ管理をしているやつ

``` npm init -y ```

``` npm i <packagename> --save ```

で追加をすることができる。npm installより他のデバイスのことを考えるとよい

### 参考URL

1. [UnityでWebSocketを使用する - Qiita](https://qiita.com/oishihiroaki/items/bb2977c72052f5dd5bd9)
2. [[Unity]Unity で WebSocket ライブラリを用いてリアルタイム通信する | プライムストラクチャーのTECHLOG](https://techblog.primestructure.co.jp/2019/06/28/unity-%E3%81%A7-websocket-%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E9%80%9A%E4%BF%A1%E3%81%99%E3%82%8B/)
3. [5分で動かせるwebsocketのサンプル3つ - Qiita](https://qiita.com/okumurakengo/items/a8ccea065f5659d1a1de)
4. [node.jsのいろいろなモジュール23 – wsでWebSocket接続 ｜ DevelopersIO](https://dev.classmethod.jp/server-side/ws/)
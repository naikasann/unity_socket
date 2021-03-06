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

```/server_nodejs $ node main.js```

で実行することができる
windowsの場合execute.batを動作することでも動作可能。

* /websocket_for_unity_to_js

unityのプロジェクトファイル
websocket clientのスクリプトが入っている。
現在キネクトの動作パッケージも追加されている。

* websocket-shape.dll

Unity内のasetに入れておくことでwebsocket通信を行うことができる。[github](https://github.com/sta/websocket-sharp)から取得してビルドすると生成されるが,
現在の自分の周辺環境からでは不可能だったで過去データから掘り起こした。

## 各種開発中環境

* Unity  --- 2019.2.9f(Unity Hub)
* NodeJS --- v12.13.0


## nqmのメモ(nodejsのパッケージ管理)

nqmはnodejsのパッケージ管理をしているやつ

``` npm init -y ```

``` npm i <packagename> --save ```

で追加をすることができる。
使用しているnpm packageのインストールは /server_nodejs/npm_packageでコマンド

``` npm install ```

### 参考URL

#### 通信回り(unity, nodejs, js)
1. [sta/websocket-sharp: A C# implementation of the WebSocket protocol client and server](https://github.com/sta/websocket-sharp)
2. [UnityでWebSocketを使用する - Qiita](https://qiita.com/oishihiroaki/items/bb2977c72052f5dd5bd9)
3. [[Unity]Unity で WebSocket ライブラリを用いてリアルタイム通信する | プライムストラクチャーのTECHLOG](https://techblog.primestructure.co.jp/2019/06/28/unity-%E3%81%A7-websocket-%E3%83%A9%E3%82%A4%E3%83%96%E3%83%A9%E3%83%AA%E3%82%92%E7%94%A8%E3%81%84%E3%81%A6%E3%83%AA%E3%82%A2%E3%83%AB%E3%82%BF%E3%82%A4%E3%83%A0%E9%80%9A%E4%BF%A1%E3%81%99%E3%82%8B/)
4. [5分で動かせるwebsocketのサンプル3つ - Qiita](https://qiita.com/okumurakengo/items/a8ccea065f5659d1a1de)
5. [node.jsのいろいろなモジュール23 – wsでWebSocket接続 ｜ DevelopersIO](https://dev.classmethod.jp/server-side/ws/)
6. [node.js で URLパースすると favicon.ico が返る - IMUZA.com](https://www.imuza.com/entry/2019/02/04/194914)

#### web周り(html, css)
1. [コピペで使えるCSSデザインサンプル集(Web用コード250個以上まとめ)](https://saruwakakun.com/html-css/reference/css-sample#section3)
2. [CSSでフッターをウィンドウ最下部に固定する方法【初心者向け】 | TechAcademyマガジン](https://techacademy.jp/magazine/19410)

#### unity kinect周り
1. [Download Kinect for Windows SDK 2.0 from Official Microsoft Download Center](https://www.microsoft.com/en-us/download/details.aspx?id=44561)
2. [Kinect - Windows アプリの開発](https://developer.microsoft.com/ja-jp/windows/kinect)
3. [UnityでKinectを動かす - Qiita](https://qiita.com/yuzupon/items/4528f7fc09a42fb8af2e)
4. [[C#]foreach文で配列の要素をすべて表示 | 技術雑記](https://algorithm.joho.info/programming/csharp/array-foreach-cs/)
5. [引数の型を何でも List にしちゃう奴にそろそろ一言いっておくか - Qiita](https://qiita.com/lobin-z0x50/items/248db6d0629c7abe47dd)
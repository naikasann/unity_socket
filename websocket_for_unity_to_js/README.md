# websocket_for_unity_to_js

## システム概要

unity_socketのunity部分。
アクションをおこしその結果をサーバーに送る部分を行う。

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

このUnity部分を作成している。

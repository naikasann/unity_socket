const WebSocket  = require('ws');
motion_num = 10;

function getSecureRandom(){
    var random_motion = Math.floor( Math.random() * (motion_num + 1) );
  
    return random_motion;
}

exports.CreateWebsocketServer = function () {
    var connection_list = [];
    var connect_list = [];
    var motion_list = [];
    var unity_send = false;

    //websocket server 
    const wss = new WebSocket.Server({ port: 443 });
    //websocketserver connection callback
    wss.on('connection', (ws) => {
        console.log('Established a connection with client.');
        connection_list.push(ws);
        random_motion = getSecureRandom() % motion_num;
        //console.log(connection_list);

        ws.on('message', (message) => {
            var receive = message;
            console.log(receive);
            //unityからの送信の場合処理を行わない。
            if(ws == connection_list[0]){
                //unity側からの処理
                console.log("unity_process");
                //送られてきたモーション番号と一致しているか探し、送信されているコネクションリストと紐づけ。
                //送らて来たメッセージの状態確認(1 : モーション認証、 2: 指さし動作)
                // 1の場合　1,コネクションリスト,
                var state_message = receive.split(",");
                var next_connect_number;
                if(state_message[0] == "1"){
                    for(var i = 0; i < connect_list.length; i++){
                        if(connect_list[i][0] == state_message[1]){
                            connect_list.splice(i);
                            motion_list.splice(i);
                        }
                    }
                    connection_list[0].send(String(connect_list));


                    console.log("motion link message... link now!");
                }else if(state_message[0] == "2"){
                    console.log("yubisashi motion now! link data now");
                }else{
                    console.log("bug? message.... do not process execute!");
                }

            }else{
                //デバイスからの処理
                console.log("guest deveice process")
                // モーションの数から配列がオーバーした場合。-1を送信してエラー処理を行う。
                if(motion_list.length >= motion_num){
                    console.log("req max array...");
                    ws.send(-1);
                }else{
                    // 重複しないモーションの番号を探し、それを格納する。
                    while(motion_list.indexOf(random_motion) >= 0){
                        random_motion = getSecureRandom() % motion_num;
                    }
                    for(var i = 0; i < motion_num; i++){
                        if(ws == connection_list[i]){
                            break;
                        }
                    }
                    // connect_list = [接続番号：モーション番号]
                    connect_list.push([i, random_motion]);
                    motion_list.push(random_motion);
                    console.log(connect_list);
                    ws.send(random_motion);
                    // send unity data...
                    connection_list[0].send(String(connect_list));
                }
            }
        });
    });
    console.log("Websocket_Server localhost:443")
}
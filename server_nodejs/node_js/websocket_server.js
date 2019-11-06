const WebSocket  = require('ws');

function getSecureRandom(){
    var random_motion = Math.floor( Math.random() * 11 );
  
    return random_motion;
}

exports.CreateWebsocketServer = function () {
    var connection_list = [];
    var motion_list = [];
    var unity_send = false;

    //websocket server 
    const wss = new WebSocket.Server({ port: 443 });
    //websocketserver connection callback
    wss.on('connection', (ws) => {
        console.log('Established a connection with client.');
        connection_list.push(ws);
        random_motion = getSecureRandom() % 10;
        //console.log(connection_list);

        ws.on('message', (message) => {
            console.log(`${message}`);
            var receive = ${message};
            //unityからの送信の場合処理を行わない。
            if(ws == connection_list[0]){
                //unity側からの処理
                console.log("unity_process");
                switch(String(receive)){
                    //送られてきたモーション番号と一致しているか探し、送信されているコネクションリストと紐づけ。
                    case "1":
                        break;
                    case "2":
                        break;
                }
            }else{
                //デバイスからの処理
                console.log("guest deveice process")
                // モーションの数から配列がオーバーした場合。-1を送信してエラー処理を行う。
                if(motion_list.length >= 10){
                    console.log("req max array...");
                    ws.send(-1);
                }else{
                    // 重複しないモーションの番号を探し、それを格納する。
                    // [接続番号：モーション番号]
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
    console.log("Websocket_Server localhost:443")
}
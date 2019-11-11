const ws = new WebSocket("ws://127.0.0.1:443");

img = new Array("../resource/img/seikou_banzai_man.png",
                "../resource/img/businesswoman5_ureshii.png",
                "../resource/img/byebye_girl.png",
                "../resource/img/janken_choki.png",
                "../resource/img/janken_gu.png",
                "../resource/img/janken_pa.png",
                "../resource/img/joushi_buka_women3_gekido.png",
                "../resource/img/kyosyu_smartphone_woman.png",
                "../resource/img/pose_heart_hand_man.png",
                "../resource/img/seikou_banzai_man.png",
                "../resource/img/animal_kowai_kaba.png",);

ws.addEventListener("open", e => {
    var request_state = document.getElementById("request_state");
    var connect_state = document.getElementById("connect_state");
    request_state.innerHTML = "申請ボタンを押してください！";
    connect_state.innerHTML = "接続できています";
});

ws.addEventListener("message", e => {
    var receive = e.data;
    var receive_list = receive.split(",");

    //recive action 
    if(receive_list[0] == "0"){
        var action = parseInt(receive_list[1]);
        console.log(action)
        var request_state = document.getElementById("request_state");
        var action_request = document.getElementById("action_request");
        request_state.innerHTML = "申請しました！";
        switch(action){
            case -1:
                document.getElementById("action_img").src = img[10];
                action_request.innerHTML = "現在認証システムが混み合っています… <br>もう少し時間を空けて再度アクセスしてみてください";
                break;
            default:
                document.getElementById("action_img").src = img[action];
                action_request.innerHTML = action + ": ○○をしてください";
                break;
        }
    //receive ok
    }else if(receive_list[1] == "1"){

    //yubisashi
    }else if(receive_list[0] == "2"){

    }else{
        var request_state = document.getElementById("request_state");
        var connect_state = document.getElementById("connect_state");
        request_state.innerHTML = "よくバグを発生させました。管理者に連絡してください。喜びます。";
        connect_state.innerHTML = "バグが起きています。";
    }

});

ws.addEventListener("close", e => { 
    var request_state = document.getElementById("request_state");   
    var connect_state = document.getElementById("connect_state");
    request_state.innerHTML = "申請ができません。";
    connect_state.innerHTML = "接続が切断されました";
});

ws.addEventListener("error", e => {
    var request_state = document.getElementById("request_state");
    var connect_state = document.getElementById("connect_state");
    request_state.innerHTML = "申請ができません。";
    connect_state.innerHTML = "接続エラーです。再接続をお願いします。";
});

btn.addEventListener("click", e => {
    ws.send("request new member");
});

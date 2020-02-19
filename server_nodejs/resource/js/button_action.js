const ws = new WebSocket("ws://127.0.0.1:443");
//timeout interval(ms)
const timeout_interval = 5000;
//request stetement for timeout state.
var timeout_state = false;
//for request timeout detection.
var request_for_action_list = [];

function timeout_request(){
    console.log("timeout checking...");
    if(timeout_state){
        timeout_state = false;
        console.log("timeout request!")
        ws.send(request_for_action_list[0]);
        request_for_action_list.splice(0, request_for_action_list.length);
        var request_state = document.getElementById("request_state");   
        var connect_state = document.getElementById("connect_state");
        request_state.innerHTML = "タイムアウトが発生しました。<br>お手数ですが再度申請をお願いします。";
        connect_state.innerHTML = "認証の際にタイムアウトしました。(サーバーとは接続してます)";
        document.getElementById("action_img").src = "../resource/img/attention/okotowari_shimasu_man.png";
    }
}

const img = new Array("../resource/img/motion/seikou_banzai_man.png",
                "../resource/img/motion/businesswoman5_ureshii.png",
                "../resource/img/motion/byebye_girl.png",
                "../resource/img/motion/janken_choki.png",
                "../resource/img/motion/janken_gu.png",
                "../resource/img/motion/janken_pa.png",
                "../resource/img/motion/joushi_buka_women3_gekido.png",
                "../resource/img/motion/kyosyu_smartphone_woman.png",
                "../resource/img/motion/pose_heart_hand_man.png",
                "../resource/img/motion/seikou_banzai_man.png",
                "../resource/img/motion/animal_kowai_kaba.png",
                "../resource/img/motion/computer_oneclick_sagi.png");

const yubisashi_img = new Array("../resource/img/yubisashi/cult_kyoudan.png",
                            "../resource/img/yubisashi/nanakusa_suzushiro",
                            "../resource/img/yubisashi/oldman_haikai_man",
                            "../resource/img/yubisashi/tatemono_kouen",
                            "../resource/img/yubisashi/uchidenokoduchi_eto06_hebi"
);

const yubisashi_text = new Array("怪しい宗教団体やカルト教団が、暗い部屋で不気味な儀式を行っているイラストです。https://www.irasutoya.com/2014/07/blog-post_2394.html",
                           "春の七草の一つ、すずしろのイラストです。現在は大根と呼ばれています。　https://www.irasutoya.com/2014/03/blog-post_3268.html",
                            "認知症になって街を徘徊をして迷子になっている、おじいさんのイラストです。 https://www.irasutoya.com/2014/01/blog-post_8838.html",
                            "滑り台と、ジャングルジムと、鉄棒と、砂場がある、公園のイラストです。 https://www.irasutoya.com/2013/05/blog-post_2602.html",
                            "干支（ヘビ）のキャラクターがしっぽで打ち出の小槌を振っているイラストです。 https://www.irasutoya.com/2019/05/blog-post_8.html");

ws.addEventListener("open", e => {
    var request_state = document.getElementById("request_state");
    var connect_state = document.getElementById("connect_state");
    request_state.innerHTML = "申請ボタンを押してください！";
    connect_state.innerHTML = "接続できています";
});

ws.addEventListener("message", e => {
    var receive = e.data;
    var receive_list = receive.split(",");
    console.log(receive);

    //recive action 
    if(receive_list[0] == "0"){
        var action = parseInt(receive_list[1]);
        console.log(action)
        var request_state = document.getElementById("request_state");
        var action_request = document.getElementById("action_request");
        var button_state = document.getElementById("btn");
        button_state.innerHTML = "Request";
        request_state.innerHTML = "申請しました！";
        switch(action){
            case -1:
                document.getElementById("action_img").src = img[img.length-2];
                action_request.innerHTML = "現在認証システムが混み合っています… <br>もう少し時間を空けて再度アクセスしてみてください";
                break;
            default:
                request_for_action_list.push(action);
                document.getElementById("action_img").src = img[action];
                action_request.innerHTML = action + ": ○○をしてください<br>そのモーションをしたまま少しお待ちください！";
                console.log(request_for_action_list);
                break;
        }
    //receive ok
    }else if(receive_list[0] == "1"){
        //timeout setting.
        timeout_state = false;
        //html string changing.
        var request_state = document.getElementById("request_state");
        var action_request = document.getElementById("action_request");
        var button_state = document.getElementById("btn");
        request_state.innerHTML = "認証が完了しました！";
        action_request.innerHTML = "指さしを行ってみてください。";
        button_state.innerHTML = "reconnect";
        document.getElementById("action_img").src = img[img.length-1];
    //yubisashi
    }else if(receive_list[0] == "2"){
        var target = parseInt(receive_list[1]);
        var request_state = document.getElementById("request_state");
        var action_request = document.getElementById("action_request");
        var button_state = document.getElementById("btn");
        request_state.innerHTML = "指さしを検知しました！";
        button_state.innerHTML = "reconnect";
        action_request.innerHTML = yubisashi_text[target];
        document.getElementById("action_img").src = yubisashi_img[target];
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
    ws.send("request new member!");
    timeout_state = true;
    setTimeout(timeout_request, timeout_interval);
});

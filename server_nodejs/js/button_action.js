const ws = new WebSocket("ws://127.0.0.1:3000");

img = new Array("../resource/img/seikou_banzai_man.png","../resource/img/animal_kowai_kaba.png");

ws.addEventListener("open", e => {
    alert("websocket connect!");
    console.log("websocket connect!");
});

ws.addEventListener("message", e => {
    console.log(e.data);
    var request_state = document.getElementById("request_state");
    var action_request = document.getElementById("action_request");
    request_state.innerHTML = "申請しました！";
    action_request.innerHTML = e.data + ": ○○をしてください";
    switch(e.data){
        case "2":
            document.getElementById("action_img").src = img[0];
            break;
        case "4":
            document.getElementById("action_img").src = img[1];
            break;
    }
});

ws.addEventListener("close", e => {
    alert("session close");
});

ws.addEventListener("error", e => {
    alert("error");
});

btn.addEventListener("click", e => {
    ws.send("request new member");
});

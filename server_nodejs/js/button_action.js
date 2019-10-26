const ws = new WebSocket("ws://127.0.0.1:3000");

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

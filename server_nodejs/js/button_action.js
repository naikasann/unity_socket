const sock = new WebSocket("ws://127.0.0.1:3000");

sock.addEventListener("open", e => {
    alert("接続が開かれたときに呼び出されるイベント");
});

sock.addEventListener("message", e => {
    alert("サーバーからメッセージを受信したときに呼び出されるイベント");
});

sock.addEventListener("close", e => {
    alert("接続が閉じられたときに呼び出されるイベント");
});

sock.addEventListener("error", e => {
    alert("エラーが発生したときに呼び出されるイベント");
});

btn.addEventListener("click", e => {
    sock.send("hello");
});

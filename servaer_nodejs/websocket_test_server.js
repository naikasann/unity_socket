var ws   = require ('ws').Server;

var wss = new ws ({port: 3000});


wss.broadcast = function (data) {
    for (var i in this.clients) {
        this.clients [i].send (data);
    }
};

wss.on ('connection', function (ws) {
    ws.on ('message', function (message) {
        var now = new Date();
        console.log (now.toLocaleString() + ' Received: %s', message);
        wss.broadcast (message);
    });
});
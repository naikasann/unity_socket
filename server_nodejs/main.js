var export_websokcet = require("./websocket_server.js");
var export_http = require("./http_server.js");

export_http.CreateHttpServer();
export_websokcet.CreateWebsocketServer();
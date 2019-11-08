const http = require('http');
const fs = require('fs');
const WebSocket  = require('ws');

var export_websokcet = require("./node_js/websocket_server");
var export_http = require("./node_js/http_server");

export_http.CreateHttpServer();
export_websokcet.CreateWebsocketServer();
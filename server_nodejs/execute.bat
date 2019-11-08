dir
echo "server execute...."
node ./node_js/http_server.js | node ./node_js/websocket_server.js
pause
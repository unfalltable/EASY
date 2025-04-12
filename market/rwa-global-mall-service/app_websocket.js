const fs = require("fs");
const http = require("http");
const https = require("https");
const WebSocket = require("ws");

const PORT = 3051;

const environment = process.env.NODE_ENV;
// 读取SSL证书和私钥
const SSL_INFO = {
  key: fs.readFileSync(""),
  cert: fs.readFileSync(""),
};
const server =
  environment === "production"
    ? https.createServer(SSL_INFO)
    : http.createServer();

server.on("error", (error) => {
  console.error("Server error:", error);
});

const wss = new WebSocket.Server({ server });

// WebSocket 连接
wss.on("connection", function connection(ws) {
  console.log("connected");

  // 接收消息
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    // 发送消息
    ws.send("server: " + message);
  });

  // 关闭连接
  ws.on("close", function close() {
    console.log("disconnected");
  });
});

wss.on("error", (error) => {
  console.error("WebSocket Server error:", error);
});

server.listen(PORT, () => {
  const protocol = environment === "production" ? "wss" : "ws";
  console.log(`WebSocket is running on ${protocol}://localhost:${PORT}`);
});

module.exports = wss;

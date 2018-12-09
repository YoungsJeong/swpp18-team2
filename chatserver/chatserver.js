"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var http_1 = require("http");
var express = require("express");
var SocketIO = require("socket.io");
var http = require("http");
var PORT_NUMBER = 4577;
var Message = /** @class */ (function () {
    function Message(fromUser, content) {
        this.fromUser = fromUser;
        this.content = content;
    }
    return Message;
}());
exports.Message = Message;
var ChatMessage = /** @class */ (function (_super) {
    __extends(ChatMessage, _super);
    function ChatMessage(fromUser, content) {
        return _super.call(this, fromUser, content) || this;
    }
    return ChatMessage;
}(Message));
exports.ChatMessage = ChatMessage;
var ChatServer = /** @class */ (function () {
    function ChatServer() {
        this.app = express();
        this.port = PORT_NUMBER;
        this.server = http_1.createServer(this.app);
        this.io = SocketIO(this.server);
        this.listen();
    }
    ChatServer.prototype.listen = function () {
        var _this = this;
        this.app.get('/', function (req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end("Hello world!!!!\n");
        });
        this.server.listen(this.port, function () {
            _this.log("Server running at http://13.209.77.39:" + _this.port);
        });
        this.io.on('connect', function (socket) {
            _this.log("Connected client on port " + _this.port);
            socket.on('message', function (m) {
                _this.log('[server][message]:' + JSON.stringify(m));
                _this.io.emit('message', m);
            });
            socket.on('disconnect', function () {
                _this.log('Client disconnected');
            });
        });
    };
    ChatServer.prototype.log = function (str) {
        var now = new Date();
        console.log("[" + now.getDate() + "/" + (now.getMonth() + 1) +
            (" " + now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds() + "]") + str);
    };
    ChatServer.prototype.getApp = function () {
        return this.app;
    };
    return ChatServer;
}());
exports.ChatServer = ChatServer;
var svr = new ChatServer();

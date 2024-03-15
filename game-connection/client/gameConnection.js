class GameConnection {
    constructor(url) {
        this.url = url;
    }

    connect() {
        this.websocket = new WebSocket(this.url);

        this.websocket.onopen = function(event) {
            console.log('Connection opened:', event);
        }

        this.websocket.onerror = function(event) {
            console.error('WebSocket error:', event);
        }

        this.websocket.onmessage = function(event) {
            console.log('Message from server:', event.data);
        }

        this.websocket.onclose = function(event) {
            console.log('Connection closed:', event);
        }
    }

    sendMessage(message) {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.send(message);
        } else {
            console.error('Unable to connect to game server. Unable to send message:', message);
        }
    }

    closeWebsocket() {
        if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
            this.websocket.close();
            console.log("Websocket closed")
        } else {
            console.log("Unable to close websocket. Websocket is not open or does not exist.")
        }
    }
}
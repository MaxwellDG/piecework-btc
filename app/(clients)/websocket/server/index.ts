import WebSocket from "ws";

export default class ServerWebSocket {
    serverConnection: WebSocket.Server; 
    
    constructor(){
        this.serverConnection = new WebSocket.Server({ port: 8080 });

        this.serverConnection.on('connection', function(socket){
            console.log("Connected server websocket")
        
            socket.on('message', function(data){
                console.log("Received message: ", data);
            })
        })
    }
}
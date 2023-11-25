// todo change to env variable instead of localhost. hardcoded port is fine
export default class ClientWebSocket {
    socket: WebSocket
    
    constructor(){
        this.socket = new WebSocket(`ws://localhost:8080`)

        this.socket.onmessage = ({ data }) => {
            console.log("Client received message: ", data);
        }
    }
    
    closeSocket(){
        if(this.socket){
            this.socket.close();
        }
    }

    sendMessage(text: string){
        if(this.socket){
            this.socket.send(text);
        }
    }
}

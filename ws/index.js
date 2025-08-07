// simple websocket server sending and receiving json,text and binary message
console.log("WebSocket server is starting...");
import { WebSocketServer } from "ws";

const wss = new WebSocketServer({port:8080})

wss.on("connection",(ws)=>{
    console.log("New client connected");

    ws.send(JSON.stringify({type:"welcome",message: "Welcome to the WebSocket server!"}));

    ws.on("message",(message,isBinary)=>{

        if(isBinary)
        {
            console.log("Received binary message:", message);
            ws.send(`binary message received: ${message.length} bytes`);
        }
        else
        { //json or text
            const msgText = message.toString();
            try {
                const jsonMessage = JSON.parse(msgText);
                console.log("Received JSON message:", jsonMessage);
                
                //sending json 
                ws.send(JSON.stringify({
                  type: "response",
                  original: jsonMessage,
                  message: "JSON received successfully"
                }));
            } catch (err) {
                console.log("Received text message:", msgText);
                ws.send("Received text message: " + msgText);
                return;
            }

        }
    })

    ws.on("close",()=>{
        console.log("Client disconnected");
    })
})
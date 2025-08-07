console.log("WebSocket server is starting...");

import { WebSocketServer , WebSocket} from "ws";

const wss1 = new WebSocketServer({ port: 8080 });
// const wss2 = new WebSocketServer({ port: 8081 });

const Room = {
    sockets: []
}

const rooms = {};

wss1.on("connection",(socket)=>{
    console.log("new user connected to first server");
    socket.on("message",(message)=>{
        const msgText = message.toString();
        const data = JSON.parse(msgText);
        if(data.type === "join") {
            //check if room exists
            if(!rooms[data.room]){
                rooms[data.room] = {
                    sockets: []
                };
            }
            rooms[data.room].sockets.push(socket);
            console.log("User joined room:", data.room);
        }
        if(data.type === "chat"){
            rooms[data.room].sockets.map((s)=>{
                s.send(msgText)
            })
            
        }
    });

    socket.on("close",()=>{
        console.log("user disconnected");
    });
})

// wss2.on("connection",(socket)=>{
//     console.log("new user connected to second server");

//     socket.on("message",(message)=>{
//         console.log(`Received message on second server: ${message}`);
//         socket.send(`Echo from second server: ${message}`);
//     });

//     socket.on("close",()=>{
//         console.log("user disconnected from second server");
//     });
// });
import {WebSocketServer, WebSocket } from "ws";
console.log("relayer Server is starting...");

const wss = new WebSocketServer({port : 8081});

const Servers = [];
// wss.on("connection",(socket)=>{
//     socket.on("error", (error) => {
//         console.error('WebSocket error:', error);
//     });
//     Servers.push(socket);
//     console.log("Server connected");
//     socket.on("message", (message) => {
//         Servers.filter((s) => s !== socket).map((s) => {
//             s.send(message.toString());
//             console.log("Message relayed to other servers");
//         })
//     });
// })
//Better Architecture for relaying messages between Servers we can directly send the message to the relayer server and it will relay the message to all connected servers and therefore to all clients in the room.
wss.on("connection",(socket)=>{
    socket.on("error", (error) => {
        console.error('WebSocket error:', error);
    });
    Servers.push(socket);
    console.log("Server connected");
    socket.on("message", (message) => {
        Servers.map((s) => {
            s.send(message.toString());
            console.log("Message relayed to other servers");
        })
    });
})



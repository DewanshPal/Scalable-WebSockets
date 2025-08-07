import { WebSocketServer , WebSocket} from "ws";

console.log("WebSocket server 1 is starting...");

const wss1 = new WebSocketServer({ port: 8080 });

const RELAYER_PORT = "ws://localhost:3001"; // Assuming the relayer server is running on port 3001
const relayer = new WebSocket(RELAYER_PORT);

// const Room = {
//     sockets: []
// }

const rooms = {};

//3
relayer.onmessage = ({message}) => {
    const msgText = message.toString();
    const data = JSON.parse(msgText);
    if(data.type === "chat"){
        rooms[data.room].sockets.map((s)=>{
            s.send(msgText)
            })
            
        }
}


//1
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
            // Send the message to the relayer server
            relayer.send(msgText.string);
            console.log("Message sent to relayer server:", msgText);
        }
    });

    socket.on("close",()=>{
        console.log("user disconnected");
    });
})
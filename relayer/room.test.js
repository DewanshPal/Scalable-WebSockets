import { WebSocket } from "ws";
console.log("websocket room test is starting...");

const ws1 = new WebSocket('ws://localhost:8080');
const ws2 = new WebSocket('ws://localhost:8081');

//create the promise to wait for the connection to be established


    // let count = 0;

      const joinMessage =
    {
        type: "join",
        room: "room1"
    }

     //send join message
     ws1.onopen = () =>
    {
        console.log('✅ WebSocket 1 connected');
        ws1.send(JSON.stringify(joinMessage))
    }

     ws2.onopen = () =>
    {

        console.log('✅ WebSocket 2 connected');
        ws2.send(JSON.stringify(joinMessage))
    }

    setTimeout(() => {
           ws2.send(JSON.stringify({
            type: "chat",
            room: "room1",
            message: "Hello from WebSocket 2!"
        }));
                 ws1.send(JSON.stringify({
            type: "chat",
            room: "room1",
            message: "Hello from WebSocket 1!"
        }))

    }, 1000);



     ws1.onmessage = (event) => {
        try {
            const messageText = event.data.toString();
            const jsonMessage = JSON.parse(messageText);
            if (jsonMessage.type === "chat") {
                console.log('📩 Message from server:', jsonMessage);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

    ws2.onmessage = (event) => {
        try {
            const messageText = event.data.toString();
            const jsonMessage = JSON.parse(messageText);
            if (jsonMessage.type === "chat") {
                console.log('📩 Message from server:', jsonMessage);
            }
        } catch (error) {
            console.error('Error parsing message:', error);
        }
    };

    // Handle disconnection
    ws2.onclose = () => {
    console.log('❌ Disconnected from server');
    };

        // Handle disconnection
    ws1.onclose = () => {
    console.log('❌ Disconnected from server');
    };


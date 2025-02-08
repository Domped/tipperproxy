const WebSocket = require('ws');

const PORT = process.env.PORT || 3000;
const wss = new WebSocket.Server({ port: PORT });

let clients = [];

wss.on('connection', (ws) => {
   clients.push(ws);
   console.log(`Client connected: ${clients.length}`);

   ws.on("scraper", (message)=> {
       clients.forEach((client) => {
           if (client !== ws && client.readyState === WebSocket.OPEN) {
               client.send(message);
           }
       });
   })

    ws.on('close', () => {
       clients = clients.filter((client) => client!== ws);
    });
});

console.log(`WebSocket server is running on port ${PORT}`);
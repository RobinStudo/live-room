import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.on('originMessage', (messageData) => {
        socket.broadcast.emit('forwardMessage', messageData);
    });
});

io.listen(3000);

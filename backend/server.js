import { Server } from "socket.io";

const io = new Server({
    cors: {
        origin: "*",
    },
});

io.on("connection", (socket) => {
    socket.on('originMessage', (message) => {
        socket.broadcast.emit('forwardMessage', message);
    });
});

io.listen(3000);

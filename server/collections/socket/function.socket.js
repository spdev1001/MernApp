'use strict';
exports.register = function (io, socket) {
    //custom receiver event ,open this doces not require any authentication
    socket.on("customevent", function (obj) {
        console.log('event is captured on server');
        io.to(`${socket.id}`).emit("customevent_response_from_server", { _socket: socket.id });
    });

    socket.on("user:save", function (obj) {
        console.log(' user:save event is captured on server');
        io.to(`${socket.id}`).emit("user:read", { _socket: socket.id });
    });
}
"use strict";
function onConnect(io,socket) {
    //This is a reciever function, When the client emits 'info', this listens and executes
    socket.on("info", function (data) {
        console.log("Info Socket : " + "[%s] %s", socket.address, JSON.stringify(data, null, 2));
    });
    require('../collections/socket/function.socket').register(io,socket);
}
module.exports = function (io) {
    io.on('connection', (socket) => {
        socket.address = socket.request.connection.remoteAddress + ":" + socket.request.connection.remotePort;
        socket.connectedAt = new Date();
        console.log('---------------------------------------------------------------------------------');
        console.log('A user is connected : ' + socket.address + '. socket id :' + socket.id);

        socket.on('disconnect', () => {
            console.log('A user is disconnected on socketio.js: ' + socket.address);
        });

        socket.on("connection_error", (err) => {
            console.log(err.req);
            console.log(err.code);
            console.log(err.message);
            console.log(err.context);
        });

        onConnect(io,socket);
    });
}
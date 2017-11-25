var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
io.on('connection', client => {
    client.on('change', ({ id, strokes}) => {
        client.broadcast.emit('change', { id, data: strokes});
    });
    console.log(io.sockets.sockets);
});
server.listen(8000);

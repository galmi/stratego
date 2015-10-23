/**
 * Created by ildar on 21.10.15.
 */
'use strict';

module.exports = function (server) {
  let io = require('socket.io')(server);
  io
    .of('/channel')
    .on('connection', function (socket) {
      socket.emit('main', io.engine.clientsCount);
      socket.broadcast.emit('main', io.engine.clientsCount);
      socket.on('disconnect', function () {
        socket.broadcast.emit('main', io.engine.clientsCount);
      });
    });
};

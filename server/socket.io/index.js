import io from 'socket.io';

module.exports = function (server, config) {
  const UNITITLED_PRESENTATION = 'No Current Presentation';
  let io = require('socket.io').listen(server);
  let audience = [];
  let connections = [];
  let speaker = {};
  let title = UNITITLED_PRESENTATION;

  io.sockets.on('connection', function (socket) {

    // DISCONNECT
    require('./disconnect')(audience, connections, io, socket, speaker, title);

    // JOIN
    require('./join')(audience, io, socket);

    // START PRESENTATION
    require('./start')(io, socket, speaker, title);

    // WELCOME (includes questions)
    require('./welcome')(audience, socket, speaker, title);

    connections.push(socket);
    console.log("Connected: %s sockets remaining.", connections.length);
  });

  console.log("Connected: %s sockets connected.", connections.length);
  console.log(`Listening, via socket.io,  at http://localhost:${config.port}`);
};



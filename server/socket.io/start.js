'use strict';


module.exports = function(io, socket, speaker, title)
{

  socket.on('start', function(payload) {
    console.log('payload name: ' + payload.name);
    debugger;
    speaker.name = payload.name
    speaker.id = this.id;
    speaker.type = 'speaker';
    title = payload.title;
    this.emit('joined', speaker);
    io.sockets.emit('start', { title: title, speaker: speaker });
    console.log("Presentation Started: '%s' by %s", title, speaker.name);
  });


}

'use strict';

module.exports = function(audience, io, socket)
{

  socket.on('join', function (payload) {
    // new member
    const newMember = {
      id: this.id,
      name: payload.name,
      type: 'audience'
    };

    // JOINED
    this.emit('joined', newMember);
    audience.push(newMember);
    // broadcast to everyone
    io.sockets.emit('audience', audience);
    console.log("Audience Member Name %s", payload.name + '\n');
  });

};
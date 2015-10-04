'use strict';
import lodash from 'lodash';

module.exports = function (audience, connections, io, socket, speaker, title) {

  socket.once('disconnect', function() {

    var member = lodash.findWhere(audience, { id: this.id });

    if (member) {
      audience.splice(audience.indexOf(member), 1);
      io.sockets.emit('audience', audience);
      console.log("Left: %s (%s audience members)", member.name, audience.length)
    } else if (this.id === speaker.id) {
      console.log("%s has left. '%s' is over.", speaker.name, title);
      title = "Untitled Presentation";
      speaker.name = '[NO SPEAKERS ONLINE]';
      io.sockets.emit('end', { title: title, speaker: speaker });
    }

    connections.splice(connections.indexOf(socket), 1);
    socket.disconnect();
    console.log("Disconnected: %s sockets remaining.", connections.length);
  });

}

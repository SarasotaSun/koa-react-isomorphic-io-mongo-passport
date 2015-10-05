'use strict';


module.exports = function(currentQuestion, io, socket) {

  socket.on('ask', function(question){
    currentQuestion = question;
    io.sockets.emit('ask', currentQuestion);
    console.log('Question asked %s', question.q);

  });
};

'use strict';


module.exports = function(currentQuestion, io, questionAsked, socket) {

  socket.on('ask', function(question){
    currentQuestion = question;
    io.sockets.emit('ask', { currentQuestion: currentQuestion, questionAsked: questionAsked });
    console.log('Question asked %s', question.question);

  });
};

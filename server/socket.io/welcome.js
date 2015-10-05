'use strict';

let questions = require('../data/questions');

module.exports = function (audience, currentQuestion, socket, speaker, title)
{
  socket.emit('welcome', {
    audience: audience,
    currentQuestion: currentQuestion,
    questions: questions,
    speaker: speaker,
    title: title
  });
};
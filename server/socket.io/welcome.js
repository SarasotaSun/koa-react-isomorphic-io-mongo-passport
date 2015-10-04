'use strict'

let questions = require('../data/questions');

module.exports = function (audience, socket, speaker, title)
{
  socket.emit('welcome', {
    audience: audience,
    questions: questions,
    speaker: speaker,
    title: title
  });
}
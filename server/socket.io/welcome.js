'use strict';

let questions = require('../data/questions');

module.exports = function (audience, currentQuestion, questionAsked, socket, speaker, title)
{
  socket.emit('welcome', {
    audience: audience,
    currentQuestion: currentQuestion,
    questionAsked: questionAsked,
    questions: questions,
    speaker: speaker,
    title: title
  });
};
import io from 'socket.io';
import lodash from 'lodash';

module.exports = function (server, config) {

  const UNITITLED_PRESENTATION = 'No Current Presentation';
  let io = require('socket.io').listen(server);
  let audience = [];
  let connections = [];
  let currentQuestion = {};
  let questions = require('../data/questions');
  let results = { a: 0, b: 0, c: 0, d: 0 };
  let speaker = {};
  let title = UNITITLED_PRESENTATION;

  // CONNECTING SOCKET
  io.sockets.on('connection', function (socket) {

    // DISCONNECTING DROP CONNECTION
    socket.once('disconnect', function () {
      var member = lodash.findWhere(audience, { id: this.id });

      if (member) {
        audience.splice(audience.indexOf(member), 1);
        io.sockets.emit('audience', audience);
        console.log("Left: %s (%s audience members)", member.name, audience.length)
      } else if (this.id === speaker.id) {
        console.log("%s has left. '%s' is over.", speaker.name, title);
        speaker = {};
        io.sockets.emit('endPresentation', { title: UNITITLED_PRESENTATION, speaker: ''});
      }

      connections.splice(connections.indexOf(socket), 1);
      socket.disconnect();
      console.log("Disconnected: %s sockets remaining.", connections.length);
    });

    socket.on('join', function (payload) {
      // store new member
      var newMember = {
        id: this.id,
        name: payload.name,
        type: 'audience'
      };
      this.emit('joined', newMember);
      audience.push(newMember);
      io.sockets.emit('audience', audience);
      console.log("Audience Joined: %s", payload.name);
    });

    socket.on('speakerStart', function (payload) {
      speaker.name = payload.name
      speaker.id = this.id;
      speaker.type = 'speaker';
      title = payload.title;
      this.emit('joined', speaker);
      io.sockets.emit('speakerStart', {title: title, speaker: speaker.name});
      console.log("Presentation Started: '%s' by %s", title, speaker.name);
    });

    socket.on('askQuestion', function(question){
      currentQuestion = question;
      results = {a:0, b:0, c:0, d:0};
      io.sockets.emit('askQuestion', currentQuestion);
      console.log('Question asked %s', question.query);
    });


    socket.on('answer', function(payload) {
      results[payload.choice]++;
      io.sockets.emit('results', results);
      console.log("Answer: '%s' - %j", payload.choice, results);
    });

    socket.emit('welcome', {
      audience: audience,
      // ensures newly arriving members see any existing current question
      currentQuestion: currentQuestion,
      questions: questions,
      speaker: speaker.name,
      results: results,
      title: title
    });

    connections.push(socket);
    console.log("Connected: %s sockets remaining.", connections.length);
  });

  console.log("Connected: %s sockets connected.", connections.length);
  console.log(`Listening, via socket.io,  at http://localhost:${config.port}`);
};

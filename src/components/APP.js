import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import Header from './parts/Header';

require('../styles/app.css');

export default class APP extends Component {
  static propTypes = {
    children: PropTypes.element
  };

  constructor(props, context) {
    super(props, context);
    this.state = ({
      audience: [],
      currentQuestion: {},
      questionAsked: false,
      member: {},
      questions: [],
      speaker: {},
      status: 'disconnected',
      title: ''
    });
  }

  componentWillMount() {
    this.socket = io('http://localhost:3000');

    this.socket.on('ask', this.ask.bind(this));
    this.socket.on('audience', this.updateAudience.bind(this));
    this.socket.on('end', this.updateState.bind(this));
    this.socket.on('connect', this.connect.bind(this));
    this.socket.on('disconnect', this.disconnect.bind(this));
    this.socket.on('joined', this.joined.bind(this));
    this.socket.on('start', this.start.bind(this));
    this.socket.on('welcome', this.updateState.bind(this));
  }

  ask(question) {
    console.log('server changed question to : ' + this.state.currentQuestion);
    sessionStorage.answer = '';
    this.setState({ currentQuestion: question, questionAsked: true });
  }

  connect() {
    const member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;

    if (member && member.type === 'audience') {
      this.emit('join', member);
    } else if (member && member.type === 'speaker') {
      this.emit('start', { name: member.name, title: sessionStorage.title });
    }

    this.setState({ status: 'connected' });
  }

  disconnect() {
    this.setState({
      status: 'disconnected',
      title: 'disconnected',
      speaker: {}
    });
  }

  emit(eventName, payload) {
    this.socket.emit(eventName, payload);
  }

  joined(member) {
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member: member });
  }

  start(presentation) {
    if (this.state.member.type === 'speaker') {
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  }

  updateAudience(newAudience) {
    this.setState({ audience: newAudience });
  }

  updateState(serverState) {
    this.setState(serverState);
  }

  renderChild = () =>
    React.cloneElement(this.props.children, {
      emit: this.emit.bind(this),
      ...this.state
    });

  render() {
    return (
      <div>
        <Header {...this.state } />
        { React.Children
          .map(this.props.children, this.renderChild) }
      </div>
    );
  }
}


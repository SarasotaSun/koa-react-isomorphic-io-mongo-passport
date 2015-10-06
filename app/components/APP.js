import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import Header from './parts/Header';

require('../styles/app.css');

export default class APP extends Component {
  static propTypes = {
    children: PropTypes.element,
    emit: PropTypes.func
  };

  constructor(props, context) {
    super(props, context);
    this.state = ({
      audience: [],
      currentQuestion: {},
      member: {},  // socket users, ie speaker and member
      questions: [],
      results: {},
      speaker: '', // speaker is listed because multiple members have 1 speaker
      status: 'disconnected',
      title: ''
    });
  }

  componentWillMount() {
    this.socket = io('http://localhost:3000');
    this.socket.on('askQuestion', this.askQuestion.bind(this));
    this.socket.on('audience', this.updateAudience.bind(this));
    this.socket.on('endPresentation', this.updateState.bind(this));
    this.socket.on('connect', this.connect.bind(this));
    this.socket.on('disconnect', this.disconnect.bind(this));
    this.socket.on('joined', this.joined.bind(this));
    this.socket.on('results', this.updateResults.bind(this));
    this.socket.on('speakerStart', this.speakerStart.bind(this));
    this.socket.on('welcome', this.updateState.bind(this));
  }

  askQuestion(question) {
    // clear prior answers on new question
    sessionStorage.answer = '';
    this.setState({ currentQuestion: question });
  }

  connect() {
    const member = (sessionStorage.member) ? JSON.parse(sessionStorage.member) : null;
    // Keep member in session storage and user refreshes page
    if (member && member.type === 'audience') {
      this.emit('join', member);
      // Keep speaker in session storage and user refreshes page
    } else if (member && member.type === 'speaker') {
      this.emit('speakerStart', { name: member.name, title: sessionStorage.title });
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
    // Keep this member in session storage
    sessionStorage.member = JSON.stringify(member);
    this.setState({ member: member });
  }

  speakerStart(presentation) {
    if (this.state.member.type === 'speaker') {
      // save title info if speaker refreshes page
      sessionStorage.title = presentation.title;
    }
    this.setState(presentation);
  }

  updateAudience(newAudience) {
    this.setState({ audience: newAudience });
  }

  updateResults(data) {
    this.setState({ results: data });
  }

  updateState(serverState) {
    this.setState(serverState);
  }

  renderChild = () =>
    React.cloneElement(this.props.children, {
      // this needs to be passed to all child routes so they
      // can emit to parent (APP)
      emit: this.emit.bind(this),
      ...this.state
    });

  render() {
    return (
      <div>
        <Header { ...this.state } />
        { React.Children.map(this.props.children, this.renderChild) }
      </div>
    );
  }
}

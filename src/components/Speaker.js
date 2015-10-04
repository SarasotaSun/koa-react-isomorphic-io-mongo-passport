import React, { Component, PropTypes } from 'react';
import Display from './parts/Display';
import Attendance from './parts/Attendance';
import JoinSpeaker from './parts/JoinSpeaker';
import Questions from './parts/Questions';

export default class Speaker extends Component {

  static propTypes = {
    audience: PropTypes.array,
    emit: PropTypes.func,
    member: PropTypes.object,
    questions: PropTypes.array,
    status: React.PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    const questions = this.props.questions;
    return (
      <div>
        <Display if= { this.props.status === 'connected' } >
          <Display if= { this.props.member.name && this.props.member.type === 'speaker' } >
            <Questions questions= { questions } />
            <Attendance audience= { this.props.audience }/>
          </Display>
          <Display if= { !this.props.member.name } >
            <h2>Start the Presentation</h2>
            <JoinSpeaker emit= { this.props.emit } />
          </Display>
        </Display>
      </div>
    );
  }
}


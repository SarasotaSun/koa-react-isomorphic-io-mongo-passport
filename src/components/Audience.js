import React, { Component, PropTypes } from 'react';
import Display from './parts/Display';
import Ask from './parts/Ask';
import Join from './parts/Join';

export default class Audience extends Component {
  static propTypes = {
    audience: PropTypes.array,
    currentQuestion: PropTypes.any,
    emit: PropTypes.func,
    member: PropTypes.object,
    status: React.PropTypes.string,
    title: React.PropTypes.string
  };

  constructor(props) {
    super(props);
  }

  wasQuestionAsked() {
    return  this.props.currentQuestion.q !== undefined;
  }

  render() {
    console.log('wasQuestionAsked : ' + this.wasQuestionAsked());
    return (
      <div>
        <Display if={ this.props.status === 'connected' }>

          <Display if={ this.props.member.name !== undefined }>

            <Display if={!this.wasQuestionAsked() }>
              <h2>Welcome { this.props.member.name }</h2>
              <p>{ this.props.audience.length } audience members connected</p>
              <p>Questions will appear here.</p>
            </Display>

            <Display if={ this.wasQuestionAsked() }>
              <h2>{ this.props.currentQuestion.q }</h2>
            </Display>

          </Display>

          <Display if={ !this.props.member.name }>
            <h1>Join the session</h1>
            <Join emit={ this.props.emit }/>
          </Display>

        </Display>

      </div>
    );
  }
}


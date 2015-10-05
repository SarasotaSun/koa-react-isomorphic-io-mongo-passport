import React, { Component, PropTypes } from 'react';
import Display from './parts/Display';
import Join from './parts/Join';

export default class Audience extends Component {
  static propTypes = {
    audience: PropTypes.array,
    currentQuestion: PropTypes.object,
    emit: PropTypes.func,
    member: PropTypes.object,
    status: React.PropTypes.string,
    title: React.PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Display if={ this.props.status === 'connected' }>
          <Display if={ this.props.member.name !== undefined }>
            <h2>Welcome { this.props.member.name }</h2>
            <p>{ this.props.audience.length } audience members connected</p>
            <p>Questions will appear here.</p>
          </Display>


            <h2>Ask a Question</h2>
          { /* <Display if={ this.props.currentQuestion }>
            <Ask question={ this.props.currentQuestion } emit={ this.props.emit } />
          </Display>*/}

          <Display if={ !this.props.member.name }>
            <h1>Join the session</h1>
            <Join emit={ this.props.emit }/>
          </Display>

        </Display>

      </div>
    );
  }
}


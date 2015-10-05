import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';

export default class JoinSpeaker extends Component {
  static propTypes = {
    emit: PropTypes.func
  };

  start() {
    const speakerName = ReactDOM.findDOMNode(this.refs.name).value;
    const title = ReactDOM.findDOMNode(this.refs.title).value;
    this.props.emit('start', { name: speakerName, title: title });
  }

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={ this.start.bind(this) }>
        <label>Full Name</label>
        <input ref="name"
               className="form-control"
               placeholder="enter your full name..."
               required/>
        <label>Presentation Title</label>
        <input ref="title"
               className="form-control"
               placeholder="enter a title for this Presentation..."
               required/>
        <button className="btn btn-primary">Join</button>
      </form>
    );
  }
}

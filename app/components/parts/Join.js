import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import ReactDOM from 'react-dom';

export default class Join extends Component {
  static propTypes = {
    emit: PropTypes.func
  };

  join() {
    const memberName = ReactDOM.findDOMNode(this.refs.name).value;
    this.props.emit('join', { name: memberName });
  }

  render() {
    return (
      <form action="javascript:void(0)" onSubmit={ this.join.bind(this) }>
        <label>Full Name</label>
        <input ref="name"
               name="name"
               className="form-control"
               placeholder="Enter Your Full Name..."
               required/>
        <button className="btn btn-primary">Join</button>
        <Link to="/speaker">Start the presentation</Link>
        <Link to="/board">Go to the Board</Link>
      </form>
    );
  }
}

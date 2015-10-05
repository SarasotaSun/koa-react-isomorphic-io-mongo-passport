import React, { Component, PropTypes } from 'react';

export default class Header extends Component {
  static propTypes = {
    speaker: PropTypes.object,
    status: PropTypes.string,
    title: PropTypes.string
  };

  render() {
    return (
      <header className="row">
        <div className="col-xs-10">
          <h1>{ this.props.title }</h1>
            <p>{ this.props.speaker.name }</p>
        </div>
        <div className="col-xs-2">
         <span id="connection-status" className={ this.props.status }></span>
        </div>
      </header>
    );
  }
}


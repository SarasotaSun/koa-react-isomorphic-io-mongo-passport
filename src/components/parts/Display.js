import React, { Component, PropTypes } from 'react';

export default class Display extends Component {

  static propTypes = {
    children: PropTypes.node,
    if: PropTypes.bool
  }


  render() {
    return (
    	<div>
    	{ this.props.if ? <div> { this.props.children } </div> : null }
    	</div>
    	);
  }
}

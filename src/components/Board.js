import React, { Component } from 'react';

export default class Board extends Component {
  constructor() {
    super();
    console.log('board');
  }

  render() {
    return (<h1>Board : { this.props.title } </h1>);
  }
}

Board.defaultProps = {
  title: ''
};

Board.propTypes = {
  title: React.PropTypes.string
};

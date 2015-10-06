import React, { Component, PropTypes } from 'react';
import Display from './parts/Display';
const BarChart = require('react-d3').BarChart;

export default class Board extends Component {

  static propTypes = {
    currentQuestion: PropTypes.object,
    results: PropTypes.object,
    status: PropTypes.string
  };

  barGraphData(results) {
    return Object.keys(results).map(function(choice) {
      return {
        label: choice,
        value: results[choice]
      };
    });
  }

  wasQuestionAsked() {
    return this.props.currentQuestion.query !== undefined;
  }

  render() {
    console.log('this.props.currentQuestion: ' + JSON.stringify(this.props.currentQuestion));
    return (
      <div id="scoreboard">

        <Display if={ this.props.status === 'connected' && this.wasQuestionAsked() }>
          <h3>{ this.props.currentQuestion.query }</h3>
          <p>{ JSON.stringify(this.props.results) }</p>
          <BarChart
              data={ this.barGraphData(this.props.results) }
              title={ this.props.currentQuestion.query }
          />
          { /* <BarChart data={ this.barGraphData(this.props.results) }
                    title={ this.props.currentQuestion.query }
                    height={ window.innerHeight * 0.6 }
                    width={ window.innerWidth * 0.9 } /> */}
        </Display>

        <Display if={ this.props.status === 'connected' && !this.wasQuestionAsked() }>
          <h3>Awaiting a Question <blink> ....</blink></h3>
        </Display>

      </div>
    );
  }
}

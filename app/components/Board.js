import React, { PropTypes } from 'react';
import Display from './parts/Display';
import { BarChart } from 'react-d3-components';

class Board extends React.Component {

  static propTypes = {
    currentQuestion: PropTypes.object,
    results: PropTypes.object,
    status: PropTypes.string
  };

  barGraphData(results) {
    console.log('Object.keys(results): ' + Object.keys(results));
    return Object.keys(results).map(function(choice) {
      console.log('choice: ' + results[choice]);
      return {
        x: choice,
        y: results[choice]
      };
    });
  }

  wasQuestionAsked() {
    return this.props.currentQuestion.query !== undefined;
  }

  render() {
    const data = [{ label: '', values: this.barGraphData(this.props.results) }];
    return (
      <div id="scoreboard">

        <Display if={ this.props.status === 'connected' && this.wasQuestionAsked() }>
          <h3 style={ { color: 'red' } }>{ this.props.currentQuestion.query }</h3>
          <BarChart data={ data } width={ 400 } height={ 400 }
                    margin={ { top: 10, bottom: 50, left: 50, right: 10 } }/>
        </Display>

        <Display if={ this.props.status === 'connected' && !this.wasQuestionAsked() }>
          <h3>Awaiting a Question <blink> ....</blink></h3>
        </Display>
      </div>
    );
  }
}

export default Board;



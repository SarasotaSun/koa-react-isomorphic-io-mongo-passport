import React, { Component, PropTypes } from 'react';
import Display from './Display';

export default class AskQuestion extends Component {
  static propTypes = {
    currentQuestion: PropTypes.object,
    emit: PropTypes.function,
    question: PropTypes.object
  };

  constructor() {
    super();
    this.state = {
      choices: [],
      answer: undefined
    };
  }

  componentWillMount() {
    this.setUpChoices();
  }

  componentWillReceiveProps() {
    this.setUpChoices();
  }

  addChoiceButton(choice, index) {
    const buttonTypes = ['primary', 'success', 'warning', 'danger'];

    return (
      <button key={ index }
              className={ 'col-xs-12 col-sm-6 btn btn-' + buttonTypes[index] }
        // es6 with isolated 'this' for choice and not component
              onClick={ () => this.select(choice) }>
        { choice }: { this.props.question[choice] }
      </button>
    );
  }

  select(choice) {
    this.setState({ answer: choice });
    sessionStorage.answer = choice;
    this.props.emit('answer', { question: this.props.question, choice: choice });
  }

  setUpChoices() {
    // getting choices dynamically in case multuple choices are jagged per question.
    const choices = Object.keys(this.props.question); // includes question
    // don't need the question, so remove it from choices array
    choices.shift();
    this.setState({
      choices: choices,
      // answer put in session storage, so user refresh will not re-produce question to be answered again
      answer: sessionStorage.answer
    });
  }

  wasQuestionedAnswered() {
    if (this.state.answer === '') {
      return false;
    } else {
      return true;
    }
  }

  render() {
    return (
      <div id="currentQuestion">
        <Display if={ this.wasQuestionedAnswered() }>
          <h2>{ this.props.question.query }</h2>
          <h3>You answered: <span style={ { color: 'blue', fontWeight: 'bold' } }> { this.state.answer }</span></h3>
          <p style={ { fontWeight: 'bold' } }>{ this.props.question[this.state.answer] }</p>
        </Display>
        <Display if={ !this.wasQuestionedAnswered() }>
          <h2>{ this.props.question.query }</h2>
          <div className="row">
            { this.state.choices.map(this.addChoiceButton.bind(this)) }
          </div>
        </Display>
      </div>
    );
  }
}

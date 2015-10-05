import React, { Component, PropTypes } from 'react';

export default class Questions extends Component {

  static propTypes = {
    emit: PropTypes.func.sRequired,
    questions: PropTypes.array
  };

constructor() {
  super();
}

 ask(question) {
   this.props.emit('ask', question);
 }

  addQuestion(question, index) {
    return (
      <div key={ index } className="col-xs-12 col-sm-6 col-md-3">
        <span onClick={ () => this.ask(question) }>{ question.q }</span>
      </div>
    );
  }

  render() {
    const questions = this.props.questions;
    return (
      <div id="questions" className="row">
        <h2>Questions</h2>
        { questions.map(this.addQuestion.bind(this)) }
      </div>
    );
  }
}

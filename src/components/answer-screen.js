import React from 'react';
import './answer-screen.css';
import { connect } from 'react-redux';

export class AnswerScreen extends React.Component {
  onNext = (e) => {
    e.preventDefault();
    return this.props.history.push('/dashboard');
  }


  render() {
    return (
      <section>
        <h2>{this.props.correct ? 'That\'s right' : 'Sorry, that\'s incorrect'}</h2>
        <img alt={`A ${this.props.answer} sign`} src={this.props.sign} />
        <p>The correct answer is <strong>{this.props.answer}</strong></p>
        <button className="next-button" onClick={(e) => this.onNext(e)}>Next</button>
      </section>
    );
  }
}

const mapStateToProps = state => {
  let subErr = null;
  if (state.auth.error) {
    subErr = state.auth.error.message
  }
  return {
    sign: state.auth.answeredSign,
    answer: state.auth.answer,
    correct: state.auth.correct
  };
};

export default connect(mapStateToProps)(AnswerScreen);
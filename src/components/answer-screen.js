import React from 'react';
import { Redirect } from 'react-router-dom';
import './answer-screen.css';
import { connect } from 'react-redux';

export class AnswerScreen extends React.Component {
  onNext = (e) => {
    e.preventDefault();
    return this.props.history.push('/dashboard');
  }

  render() {
    if (this.props.sign === undefined) {
      return <Redirect to="/dashboard" />;
    } else {
      return (
        <section className={`answer ${this.props.sign.correct ? 'correct' : ''}`}>
          <h2 className="answer-heading">{this.props.sign.correct ? 'That\'s right' : 'Sorry, that\'s incorrect'}</h2>
          <img alt={`A ${this.props.answer} sign`} className="answer-image" src={this.props.sign.image} />
          <p>The correct answer is <strong>{this.props.sign.answer}</strong></p>
          <div>
            <p>For this sign, you've made {this.props.sign.guessesMade} guesses, with {this.props.sign.guessesCorrect} of them being correct. You have gotten this sign correct {Math.floor(this.props.sign.guessesCorrect / this.props.sign.guessesMade * 100)}% of the time.</p>
          </div>
          <button className="btn btn-secondary next-button" onClick={(e) => this.onNext(e)}>Next</button>
        </section>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    sign: state.auth.answeredSign,
  };
};

export default connect(mapStateToProps)(AnswerScreen);
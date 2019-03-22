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
        <h2>{this.props.sign.correct ? 'That\'s right' : 'Sorry, that\'s incorrect'}</h2>
        <img alt={`A ${this.props.answer} sign`} src={this.props.sign.image} />
        <p>The correct answer is <strong>{this.props.sign.answer}</strong></p>
        <div>
          <p>For this sign, you've made {this.props.sign.guessesMade} guesses, with {this.props.sign.guessesCorrect} of them being correct. You have gotten this sign correct {Math.floor(this.props.sign.guessesCorrect / this.props.sign.guessesMade * 100)}% of the time.</p>
        </div>
        <button className="next-button" onClick={(e) => this.onNext(e)}>Next</button>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return {
    sign: state.auth.answeredSign,
  };
};

export default connect(mapStateToProps)(AnswerScreen);
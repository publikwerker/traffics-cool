import React from 'react';
import './progress-screen.css';
import { connect } from 'react-redux';
import { getProgress } from '../actions/auth';

export class ProgressScreen extends React.Component {
  componentDidMount() {
    return this.props.dispatch(getProgress(this.props.authToken));
  }

  onClose = (e) => {
    e.preventDefault();
    const { history } = this.props;
    return history.push('/dashboard');
  }

  signList = (array) => {
    return array.map((sign, index) => {
      return (<li key={index}><img className="learned-signs" alt="traffic sign" src={sign} /></li>);
    })
  }

  render() {
    let percent;
    // if they haven't made any guesses
    if (this.props.guessesMade === 0) {
      percent = (<span>No time to stall. <br />Let's get moving!</span>)
    } else {
      percent = (<span>That's {(this.props.guessesCorrect / this.props.guessesMade * 100).toFixed(1)} percent right!</span>);
    }
    return (
      <section className="progress">
        <h2>Your stats</h2>
        <p>Out of {this.props.guessesMade} questions, you have gotten {this.props.guessesCorrect} correct. {percent}</p>
        <section className="progress-data">
          <p>Signs you have mastered:</p>
          <ul className="progress-list">
            {this.props.learned ? this.signList(this.props.learned) : <p>You have not mastered any signs, yet.</p>}
          </ul>
        </section>
        <button
          className="btn btn-primary close-button"
          type="submit"
          onClick={(e) => this.onClose(e)}>Back to questions</button>
      </section>
    );
  };
}

const mapStateToProps = state => {
  return {
    authToken: state.auth.authToken,
    guessesMade: state.auth.guessesMade,
    guessesCorrect: state.auth.guessesCorrect,
    learned: state.auth.learned
  };
};

export default connect(mapStateToProps)(ProgressScreen);

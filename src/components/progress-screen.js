import React from 'react';
import './progress-screen.css';
import { connect } from 'react-redux';
import { getProgress } from '../actions/auth';
import { isNullOrUndefined } from 'util';

export class ProgressScreen extends React.Component {
  componentDidMount(){
   return this.props.dispatch(getProgress(this.props.authToken));
  }

  onClose = (e) => {
      e.preventDefault();
      const { history } = this.props;
      return history.push('/dashboard');
  }
  
  render(){
    let masteredList;
    console.log(this.props.learned);
      if (isNullOrUndefined(this.props.learned)){
        masteredList = (<li>You haven't mastered any signs, yet.</li>);
      } else if (this.props.learned.length === 1){ 
        masteredList = (<li>You have mastered the {this.props.learned[0].sign} sign.</li>);
      } else if (this.props.learned.length > 1){ 
        masteredList = (<li>Signs you have mastered: {this.props.learned}.</li>);
      }
    console.log(masteredList);
    return (
      <div>
        <ul className="progress-data">
          <li>Out of {this.props.guessesMade} questions,</li>
          <li>you have gotten {this.props.guessesCorrect} correct.</li>
          {masteredList}
          <button 
            type="submit"
            className="close-button" 
            onClick={(e) => this.onClose(e)}>Close</button>
        </ul>
      </div>
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

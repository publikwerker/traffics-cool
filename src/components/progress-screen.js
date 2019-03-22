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

  signList = (array) => {
    console.log(array);
    return array.map((sign, index) => {
      return <img className="learned-signs" key={index} alt="traffic sign" src={sign}/>
    })
  }
  
  render(){
    let masteredList;
    let percent;
    // if they haven't made any guesses
    if (this.props.guessesMade === 0){
      percent = (<li>No time to stall. <br />Let's get moving!</li>)
    } else {
      percent = (<li>That's {(this.props.guessesCorrect/this.props.guessesMade*100).toFixed(1)} percent right!</li>);
    }
    // if the 'learned' array is empty
    if (isNullOrUndefined(this.props.learned)){
      masteredList = (<li>You haven't mastered any signs, yet.</li>);
    } else if (this.props.learned.length === 1){ 
      masteredList = (<li>You have mastered the {this.props.learned[0].sign} sign.</li>);
    } else if (this.props.learned.length > 1){ 
      masteredList = (<li>Signs you have mastered: <br />{this.signList(this.props.learned)}</li>);
    }
    return (
      <div>
        <ul className="progress-data">
          <li>Out of {this.props.guessesMade} questions,</li>
          <li>You have gotten {this.props.guessesCorrect} correct.</li>
          {percent}
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

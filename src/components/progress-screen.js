import React from 'react';
import './progress-screen.css';
import { connect } from 'react-redux';



export class ProgressScreen extends React.Component {
  onClose = (e) => {
        e.preventDefault();
    const { history } = this.props;
    return history.push('/dashboard');
  }
  
  progressData = (
      <div>
          your accuracy is: {this.props.guessesCorrect/this.props.guessesMade}
          out of {this.props.guessesMade}  question, you have answered  correctly
          
      </div> 
    )
  
  render(){
    return (
      <div>
          <span>out of {this.props.guessesMade}</span>
          <span>you have made {this.props.guessesCorrect} correct</span>
          <span>these are the words you have mastered: {this.props.learned}</span>
          <button 
            type="submit"
            className="close-button" 
            onClick={(e) => this.onClose(e)}>Close</button>
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

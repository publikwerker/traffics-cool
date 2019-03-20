import React from 'react';
import './answer-screen.css';
import {connect} from 'react-redux';

export class AnswerScreen extends React.Component{
  onNext = (e) => {
    e.preventDefault();
    console.log('onNext ran');
    return this.props.history.push(`/dashboard`);
    }
  

  render(){
       if (this.props.correct === true){
      return (
        <div>
          <h3>That's right</h3>
          <button type="submit" className="next-button" onClick={(e) => this.onNext(e)}>Next</button>
        </div>
      )
    } else {
      return (
        <div>
          <h3>Sorry, that's incorrect</h3>  
          <button type="submit" className="next-button" onClick={(e) => this.onNext(e)}>Next</button>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
      sign: state.auth.currentSign,
      answer: state.auth.answer,
      correct: state.auth.correct
  };
};

export default connect(mapStateToProps)(AnswerScreen);
import React from 'react';
import './answer-screen.css';
import { connect } from 'react-redux';
import { getSign } from '../actions/auth';

export class AnswerScreen extends React.Component{

  getNext = () => dispatch => {
    dispatch(getSign());
  }
  onNext = (e) => {
    e.preventDefault();
    console.log('onNext ran');
   // this.getNext();
    return this.props.history.push(`/dashboard`);
    }
  

  render(){
      if (this.props.error){ 
        return (
          <div>
          {this.props.error}
          </div>
        )
      } else if (this.props.correct === true){
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
  let subErr = null;
  if (state.auth.error){
    subErr = state.auth.error.message
  }
  return {
      sign: state.auth.currentSign,
      answer: state.auth.answer,
      correct: state.auth.correct,
      error: subErr
  };
};

export default connect(mapStateToProps)(AnswerScreen);
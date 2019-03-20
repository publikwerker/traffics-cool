import React from 'react';
import './question-screen.css';
import { Field, reduxForm } from 'redux-form';

function Questionscreen(props){
  const { pristine, submitting } = props;

  return (
    <form onSubmit={props.onClick}>
      <div>
        <h3>What is the meaning of this?</h3>
        <img alt="traffic sign" src={props.sign}/>
        <label>Enter your answer:  </label>
        <Field
          name="guess" 
          component="input"
          type="text" 
          placeholder="your answer"
        />
        <button 
          className="submit-button" 
          type="submit"
          disabled={pristine || submitting}
        >Submit</button>
      </div>
    </form>
      )
}
export default reduxForm({
  form: 'questionReducer'
})(Questionscreen)
import React from 'react';
import './question-screen.css';

export default function Questionscreen(props){
  console.log(props.sign);
  return (<div>
      <h3>What is the meaning of this?</h3>
      <img alt="traffic sign" src={props.sign}/>
      <label>Enter your answer below</label>
      <input className="guess" name="guess" type="text" placeholder="your answer"></input>
      <button className="next-button" type="button">Next</button>
  </div>)
}
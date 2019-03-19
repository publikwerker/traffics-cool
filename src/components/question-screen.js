import React from 'react';

export default function Questionscreen(props){
  return (<div>
      <h2>What is the meaning of this?</h2>
      <img src={props.sign}/>
      <input type="text" placeholder="your answer"></input>
      <button className="next-button" type="button">Next</button>
  </div>)
}
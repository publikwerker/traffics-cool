import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Questionscreen from './question-screen.js';

export class Dashboard extends React.Component {
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-username">
          Hello {this.props.username}!
        </div>
        <div>
          <Questionscreen
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { authToken, error } = state.auth;
  return {
    username: state.auth.currentUser.username,
    sign: state.auth.currentSign,
    authToken: authToken,
    error: error,
    answer: state.auth.answer,
    correct: state.auth.correct
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

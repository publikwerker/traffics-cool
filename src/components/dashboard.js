import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Questionscreen from './question-screen.js';
import { ProgressScreen } from './progress-screen.js';

export class Dashboard extends React.Component {

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    return (
      <div className="dashboard">
        <div>
            <ProgressScreen show={this.props.show} handleClose={this.hideModal} />
            <button type="button" onClick={this.showModal}>Progress</button>
        </div>
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
    correct: state.auth.correct,
    show: false
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import Questionscreen from './question-screen.js';

export class Dashboard extends React.Component {
  greetUser() {
    return (
      <header className="dashboard-username">
        Hello, {this.props.name.length > 1 ? this.props.name : this.props.username}!<br /> Below is the next sign for you to identify.
      </header>
    );
  }

  render() {
    return (
      <section className="dashboard">
        {this.greetUser()}
        <Questionscreen />
      </section>
    );
  }
}

const mapStateToProps = state => {
  const { authToken, error } = state.auth;
  return {
    name: state.auth.currentUser.name,
    username: state.auth.currentUser.username,
    sign: state.auth.currentSign,
    authToken: authToken,
    error: error,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

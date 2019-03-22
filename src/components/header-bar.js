import React from 'react';
import { connect } from 'react-redux';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import './header-bar.css';
import { Link } from 'react-router-dom';

export class HeaderBar extends React.Component {
  logOut() {
    this.props.dispatch(clearAuth());
    clearAuthToken();
  }

  render() {
    // Only render the log out button if we are logged in
    let logOutButton;
    let progressButton;
    if (this.props.loggedIn) {
      logOutButton = (
        <button className="btn btn-warning logout-button" onClick={() => this.logOut()}>Log out</button>
      );
      progressButton = (
        <Link style={{ textDecoration: 'none' }}
          to="/progress">     <button className="btn btn-secondary logout-button" >Your Progress</button></Link>
      );
    }
    return (
      <header className="header-bar">
        <h1>Traffic's Cool</h1>
        <nav>
          {progressButton}
          {logOutButton}
        </nav>
      </header>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.auth.currentUser !== null,
  authToken: state.auth.authToken,
});

export default connect(mapStateToProps)(HeaderBar);

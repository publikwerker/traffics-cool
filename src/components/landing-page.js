import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './login-form';
import './landing-page.css';

export function LandingPage(props) {
    // If we are logged in redirect straight to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <section className="landing">
            <h2 className="landing-title">Welcome to Traffic's Cool</h2>
            <p className="landing-info">The hip way to learn traffic signage. We will present an image of a common traffic sign, and you can show us your knowledge! Log in to begin.</p>
            <LoginForm />
            <Link className="btn btn-secondary landing-register" to="/register">Register</Link>
        </section>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);

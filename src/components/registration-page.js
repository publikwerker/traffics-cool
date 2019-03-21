import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }
    return (
        <section className="home">
            <h2>Register for Traffic's Cool</h2>
            <RegistrationForm />
<<<<<<< HEAD
            <Link className="login-button" to="/">Login</Link>
        </div>
=======
            <Link to="/">Login</Link>
        </section>
>>>>>>> 212df45338314560f3e8a6fa48534495eea7fa32
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(RegistrationPage);

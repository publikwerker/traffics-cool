import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getSign} from '../actions/auth.js';
import { stat } from 'fs';
import Questionscreen from './question-screen.js';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(getSign(this.props.authToken));
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Hello {this.props.username}!
                </div>
                <Questionscreen sign={this.props.currentSign}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser, error} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        sign: state.auth.currentSign,
        authToken: state.auth.authToken
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

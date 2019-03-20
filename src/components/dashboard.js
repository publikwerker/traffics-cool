import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getSign} from '../actions/auth.js';
import Questionscreen from './question-screen.js';
import { submitGuess } from '../actions/auth.js';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(getSign(this.props.authToken));
    }

    handleGuess= (e) => {
        e.preventDefault();
        console.log(this.props.guess);
        return this.props.dispatch(submitGuess(this.props.guess, this.props.authToken));
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Hello {this.props.username}!
                </div>
                <Questionscreen onClick={this.handleGuess} sign={this.props.sign}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { authToken, error} = state.auth;
    let subGuess = '';
    if(state.form.questionReducer){
        if(state.form.questionReducer.values){
            subGuess = state.form.questionReducer.values.guess
        }
    }
    return {
        username: state.auth.currentUser.username,
        sign: state.auth.currentSign,
        authToken: authToken,
        error: error,
        guess: subGuess
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

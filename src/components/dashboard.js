import React from 'react';
import {connect} from 'react-redux';
import requiresLogin from './requires-login';
import {getSign} from '../actions/auth.js';
import Questionscreen from './question-screen.js';
import { submitGuess } from '../actions/auth.js';
import AnswerScreen from './answer-screen.js';

export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(getSign(this.props.authToken));
    }

    handleGuess= (e) => {
        e.preventDefault();
        console.log(this.props.guess);
        this.props.dispatch(submitGuess(this.props.guess, this.props.authToken));
        return this.props.history.push(`/answer`);
    }

    questionOrAnswer(){
        console.log('question or answer ran');
        if(this.props.correct === null){
            return (
                <div>
                    nothing here
                    <AnswerScreen correct={this.props.correct} answer={this.props.answer} />
                </div>
            )
        } else {
            return (
                <Questionscreen 
                    onClick={this.handleGuess} 
                    sign={this.props.sign}/>
            )
        }
    }

    render() {
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Hello {this.props.username}!
                </div>
                <div>
                <Questionscreen 
                    onClick={this.handleGuess} 
                    sign={this.props.sign}/>
                </div>
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
        guess: subGuess,
        answer: state.auth.answer,
        correct: state.auth.correct
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));

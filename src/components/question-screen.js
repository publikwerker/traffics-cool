import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { getSign, submitGuess } from '../actions/auth.js';
import Input from './input';
import './question-screen.css';

export class Questionscreen extends React.Component {
  componentDidMount() {
    return this.props.dispatch(getSign(this.props.authToken));
  }

  onSubmit(values) {
    const { guess } = values;
    return this.props.dispatch(submitGuess(guess, this.props.authToken, this.props.sign))
      .then(() => this.props.history.push('/answer'));
  }

  render() {
    const { pristine, submitting } = this.props;

    return (
      <form
        className="question"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <fieldset>
          <legend>What is the meaning of this?</legend>
          <img alt="traffic sign" className="question-image" src={this.props.sign} />
          <Field
            name="guess"
            component={Input}
            label="Enter your answer:"
            type="text"
            placeholder="your answer"
          />
        </fieldset>
        <button
          className="btn btn-primary submit-button"
          type="submit"
          disabled={pristine || submitting}
        >Submit</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  authToken: state.auth.authToken,
  sign: state.auth.currentSign,
});

export default reduxForm({
  form: 'question'
})(withRouter(connect(mapStateToProps)(Questionscreen)));
import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './question-screen.css';
import { Field, reduxForm } from 'redux-form';
import { getSign, submitGuess } from '../actions/auth.js';
import Input from './input';

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
        className="questionReducer"
        onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
      >
        <fieldset>
          <legend>What is the meaning of this?</legend>
          <img alt="traffic sign" src={this.props.sign} />
          <Field
            name="guess"
            component={Input}
            label="Enter your answer:"
            type="text"
            placeholder="your answer"
          />
        </fieldset>
        <button
          className="submit-button"
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
  form: 'questionReducer'
})(withRouter(connect(mapStateToProps)(Questionscreen)));
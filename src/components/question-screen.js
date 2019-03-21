import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './question-screen.css';
import { Field, reduxForm } from 'redux-form';
import { getSign, submitGuess } from '../actions/auth.js';

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
        <div>
          <h3>What is the meaning of this?</h3>
          <img alt="traffic sign" src={this.props.sign} />
          <label>Enter your answer:  </label>
          <Field
            name="guess"
            component="input"
            type="text"
            placeholder="your answer"
          />
          <button
            className="submit-button"
            type="submit"
            disabled={pristine || submitting}
          >Submit</button>
        </div>
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
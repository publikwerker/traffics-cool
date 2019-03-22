import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  GUESS_ERROR,
  GUESS_REQUEST,
  GUESS_SUCCESS,
  PROGRESS_REQUEST,
  PROGRESS_ERROR,
  PROGRESS_SUCCESS,
  SIGN_REQUEST,
  SIGN_SUCCESS,
  SIGN_ERROR
} from '../actions/auth';

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
    return Object.assign({}, state, {
      authToken: action.authToken
    });
  } else if (action.type === CLEAR_AUTH) {
    return Object.assign({}, state, {
      authToken: null,
      currentUser: null
    });
  } else if (action.type === AUTH_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  } else if (action.type === AUTH_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentUser: action.currentUser
    });
  } else if (action.type === AUTH_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === SIGN_REQUEST) {
    return Object.assign({}, state, {
      loading: false,
      error: null,
      authToken: action.authToken
    });
  } else if (action.type === SIGN_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      currentSign: action.sign
    });
  } else if (action.type === SIGN_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  } else if (action.type === GUESS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === GUESS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      answeredSign: action.sign,
    });
  } else if (action.type === GUESS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
  } else if (action.type === PROGRESS_REQUEST) {
    return Object.assign({}, state, {
      loading: true
    });
  } else if (action.type === PROGRESS_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      guessesMade: action.guessesMade,
      guessesCorrect: action.guessesCorrect,
      learned: action.learned,
    });
  } else if (action.type === PROGRESS_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error,
    });
  }
  return state;
}

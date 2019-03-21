import jwtDecode from 'jwt-decode';
import {SubmissionError} from 'redux-form';
import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {saveAuthToken, clearAuthToken} from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
    type: SET_AUTH_TOKEN,
    authToken
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
    type: CLEAR_AUTH
});

export const SIGN_REQUEST = 'SIGN_REQUEST';
export const signRequest = (authToken) => ({
    type: SIGN_REQUEST,
    authToken
});

export const SIGN_SUCCESS = 'SIGN_SUCCESS';
export const signSuccess = (sign) => ({
    type: SIGN_SUCCESS,
    sign
});

export const SIGN_ERROR = 'SIGN_ERROR';
export const signError = error => ({
    type: SIGN_ERROR,
    error
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
    type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
    type: AUTH_SUCCESS,
    currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
    type: AUTH_ERROR,
    error
});

export const GUESS_REQUEST = 'GUESS_REQUEST';
export const guessRequest = () => ({
    type: GUESS_REQUEST
});

export const GUESS_SUCCESS = 'GUESS_SUCCESS';
export const guessSuccess = (answer, correct) => ({
    type: GUESS_SUCCESS,
    correct,
    answer
});

export const GUESS_ERROR = 'GUESS_ERROR';
export const guessError = error => ({
    type: GUESS_ERROR,
    error
});

// Stores the auth token in state and localStorage, and decodes and stores
// the user data stored in the token
const storeAuthInfo = (authToken, dispatch) => {
    const decodedToken = jwtDecode(authToken);
    dispatch(setAuthToken(authToken));
    dispatch(authSuccess(decodedToken.user));
    saveAuthToken(authToken);
};

export const getSign = (authToken) => dispatch => {
    dispatch(signRequest(authToken));
    return (
        fetch(`${API_BASE_URL}/users/question`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        })
        // Reject any requests which don't return a 200 status, creating
        // errors which follow a consistent format
        .then(res => normalizeResponseErrors(res))
        .then(res => {
            console.log(res);
            return res})
        .then(res => res.json())
        .then(({sign}) => {
            console.log(sign);
            dispatch(signSuccess(sign))})
        .catch(err => {
             dispatch(authError(err));
        })
    )
}

export const login = (username, password) => dispatch => {
    dispatch(authRequest());
    return (
        fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            // Reject any requests which don't return a 200 status, creating
            // errors which follow a consistent format
            .then(res => normalizeResponseErrors(res))
            .then(res => res.json())
            .then(({authToken}) => storeAuthInfo(authToken, dispatch))
            .catch(err => {
                const {code} = err;
                const message =
                    code === 401
                        ? 'Incorrect username or password'
                        : 'Unable to login, please try again';
                dispatch(authError(err));
                // Could not authenticate, so return a SubmissionError for Redux
                // Form
                return Promise.reject(
                    new SubmissionError({
                        _error: message
                    })
                );
            })
    );
};

export const refreshAuthToken = () => (dispatch, getState) => {
    dispatch(authRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/refresh`, {
        method: 'POST',
        headers: {
            // Provide our existing token as credentials to get a new one
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({authToken}) => storeAuthInfo(authToken, dispatch))
        .catch(err => {
            // We couldn't get a refresh token because our current credentials
            // are invalid or expired, or something else went wrong, so clear
            // them and sign us out
            dispatch(authError(err));
            dispatch(clearAuth());
            clearAuthToken(authToken);
        });
};

export const submitGuess = (guess, userId, authToken) => dispatch => {
    dispatch(guessRequest());
    return fetch(`${API_BASE_URL}/users/guess`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({guess, userId})
        })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then(({answer, correct}) => dispatch(guessSuccess(answer, correct)))
        .catch(err => {
                dispatch(guessError(err));
        });
};
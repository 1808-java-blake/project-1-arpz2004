import history from '../../history';
import { signInTypes } from "./sign-in.types";
import { environment } from '../../environment';

export const updatePassword = (password: string) => {
  return {
    payload: {
      password
    },
    type: signInTypes.UPDATE_PASSWORD
  }
}

export const updateUsername = (username: string) => {
  return {
    payload: {
      username
    },
    type: signInTypes.UPDATE_USERNAME
  }
}

export const updateError = (errorMessage: string) => {
  return {
    payload: {
      errorMessage
    },
    type: signInTypes.UPDATE_ERROR
  }
}

export const login = (e: React.FormEvent<HTMLFormElement>, credentials: any) => (dispatch: any) => {
  e.preventDefault();
  fetch(`${environment.context}users/login`, {
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST',
  })
    .then(resp => {
      if (resp.status === 401) {
        dispatch({
          payload: {
            currentUser: null,
            errorMessage: 'Invalid username or password'
          },
          type: signInTypes.LOGIN
        });
      } else if (resp.status === 200) {
        return resp.json();
      } else {
        dispatch({
          payload: {
            currentUser: null,
            errorMessage: 'Failed to login at this time'
          },
          type: signInTypes.LOGIN
        });
      }
      throw new Error('Failed to login');
    })
    .then(resp => {
      sessionStorage.setItem('currentUser', JSON.stringify(resp));
      dispatch({
        payload: {
          currentUser: resp,
          errorMessage: '',
          password: '',
          username: ''
        },
        type: signInTypes.LOGIN
      });
      history.push('/reimbursements');
    })
    .catch(err => {
      console.log(err);
    });
}
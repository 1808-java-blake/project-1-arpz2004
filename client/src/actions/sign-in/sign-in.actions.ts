import { signInTypes } from "./sign-in.types";
import history from '../../history'

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

export const login = (e: React.FormEvent<HTMLFormElement>, credentials: any) => {
  let errorMessage = '';
  e.preventDefault();
  fetch('http://localhost:9001/users/login', {
    body: JSON.stringify(credentials),
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
    .then(resp => {
      if (resp.status === 401) {
        errorMessage = 'Invalid Credentials';
      } else if (resp.status === 200) {
        errorMessage = '';
        return resp.json();
      } else {
        errorMessage = 'Failed to login at this time';
      }
      throw new Error('Failed to login');
    })
    .then(resp => {
      localStorage.setItem('currentUser', JSON.stringify(resp));
      history.push('/reimbursements');
    })
    .catch(err => {
      console.log(err);
    });
  return {
    payload: {
      errorMessage
    },
    type: signInTypes.LOGIN
  };
}
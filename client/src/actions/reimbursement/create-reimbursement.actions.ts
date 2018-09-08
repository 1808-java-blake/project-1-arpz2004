import { createReimbursementTypes } from "./create-reimbursement.types";
import { Reimbursement } from "../../model/Reimbursement";
import history from '../../history'
import { getCurrentUser } from "../../App"
import { environment } from "../../environment";

export const updateError = (error: string) => {
  return {
    payload: {
      error
    },
    type: createReimbursementTypes.UPDATE_ERROR
  }
}

export const updateAmount = (amount: string) => {
  amount = amount.replace(/[$,]/g, '');
  return {
    payload: {
      amount
    },
    type: createReimbursementTypes.UPDATE_AMOUNT
  }
}

export const updateDescription = (description: string) => {
  return {
    payload: {
      description
    },
    type: createReimbursementTypes.UPDATE_DESCRIPTION
  }
}

export const updateType = (type: string) => {
  return {
    payload: {
      type
    },
    type: createReimbursementTypes.UPDATE_TYPE
  }
}
export const createReimbursement = (e: React.FormEvent<HTMLFormElement>, reimbursement: Reimbursement) => (dispatch: any) => {
  e.preventDefault();
  const currentUser = getCurrentUser();
  if (currentUser) {
    reimbursement = new Reimbursement({ ...reimbursement, author: currentUser, submitted: new Date });
    fetch(`${environment.context}reimbursements`, {
      body: JSON.stringify(reimbursement),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
      .then(resp => {
        if (resp.status === 201) {
          dispatch({
            payload: {
              errorMessage: ''
            },
            type: createReimbursementTypes.CREATE_REIMBURSEMENT
          });
          return resp.json();
        } else {
          dispatch({
            payload: {
              errorMessage: 'Failed submitting reimbursement request. Please try again.'
            },
            type: createReimbursementTypes.CREATE_REIMBURSEMENT
          });
          throw new Error('Failed creating reimbursement request');
        }
      })
      .then(resp => {
        history.push('/reimbursements');
      })
      .catch(err => {
        console.log(err);
      });
  } else {
    dispatch({
      payload: {
        errorMessage: 'You must be signed in to submit a reimbursement request.'
      },
      type: createReimbursementTypes.CREATE_REIMBURSEMENT
    });
  }
}
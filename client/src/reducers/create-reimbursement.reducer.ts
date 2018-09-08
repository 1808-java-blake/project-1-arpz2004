import { createReimbursementTypes } from "../actions/reimbursement/create-reimbursement.types";
import { ICreateReimbursementState } from ".";
import { User } from "../model/User";

const initialState: ICreateReimbursementState = {
  errorMessage: '',
  reimbursement: {
    amount: 0,
    author: new User,
    description: '',
    reimbursementId: 0,
    resolved: null,
    resolver: null,
    status: 'Pending',
    submitted: new Date,
    type: ''
  }
}

export const createReimbursementReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case createReimbursementTypes.UPDATE_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    case createReimbursementTypes.UPDATE_AMOUNT:
      return {
        ...state,
        reimbursement: {
          ...state.reimbursement,
          amount: action.payload.amount
        }
      }
    case createReimbursementTypes.UPDATE_DESCRIPTION:
      return {
        ...state,
        reimbursement:
        {
          ...state.reimbursement,
          description: action.payload.description
        }
      }
    case createReimbursementTypes.UPDATE_TYPE:
      return {
        ...state,
        reimbursement: {
          ...state.reimbursement,
          type: action.payload.type
        }
      }
    case createReimbursementTypes.CREATE_REIMBURSEMENT:
      return {
        errorMessage: action.payload.errorMessage,
        reimbursement: initialState.reimbursement
      }
  }
  return state;
}
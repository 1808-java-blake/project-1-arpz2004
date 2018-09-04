import { createReimbursementTypes } from "./create-reimbursement.types";

export const updateError = (error: string) => {
  return {
    payload: {
      error
    },
    type: createReimbursementTypes.UPDATE_ERROR
  }
}

export const updateAmount = (amount: string) => {
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

import { IReimbursementState } from ".";

const initialState: IReimbursementState = {
    amount: 0,
    description: '',
    reimbursementId: 0,
    resolved: 0,
    status: '',
    submitted: 0,
    type: ''
}

export const reimbursementReducer = (state = initialState, action: any) => {
    return state;
}
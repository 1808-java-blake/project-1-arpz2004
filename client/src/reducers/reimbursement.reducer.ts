import { IReimbursementState } from ".";
import { Reimbursement } from "../model/Reimbursement";

const initialState: IReimbursementState = {
    reimbursement: new Reimbursement
}

export const reimbursementReducer = (state = initialState, action: any) => {
    return state;
}
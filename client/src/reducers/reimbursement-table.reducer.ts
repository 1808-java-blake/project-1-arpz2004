import { IReimbursementTableState } from ".";
import { reimbursementTableTypes } from "../actions/reimbursement/reimbursement-table.types";

const initialState: IReimbursementTableState = {
    reimbursements: [],
    renderedReimbursements: []
}

export const reimbursementTableReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case reimbursementTableTypes.FETCH_REIMBURSEMENTS:
            return {
                ...state,
                reimbursements: action.payload.reimbursements,
                renderedReimbursements: action.payload.reimbursements
            }
        case reimbursementTableTypes.FILTER_REIMBURSEMENTS:
            return {
                ...state,
                renderedReimbursements: action.payload.renderedReimbursements
            }
    }
    return state;
}
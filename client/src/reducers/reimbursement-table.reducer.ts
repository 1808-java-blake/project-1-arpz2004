import { IReimbursementTableState } from ".";
import { reimbursementTableTypes } from "../actions/reimbursement/reimbursement-table.types";

const initialState: IReimbursementTableState = {
    activePage: 1,
    itemsCountPerPage: 10,
    reimbursements: [],
    renderedReimbursements: [],
}

export const reimbursementTableReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case reimbursementTableTypes.FETCH_REIMBURSEMENTS:
            const startIndex = (state.activePage - 1) * state.itemsCountPerPage;
            const endIndex = startIndex + state.itemsCountPerPage;
            return {
                ...state,
                reimbursements: action.payload.reimbursements,
                renderedReimbursements: action.payload.reimbursements.slice(startIndex, endIndex)
            }
        case reimbursementTableTypes.FILTER_REIMBURSEMENTS:
            return {
                ...state,
                renderedReimbursements: action.payload.renderedReimbursements
            }
        case reimbursementTableTypes.UPDATE_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.payload.activePage,
                renderedReimbursements: action.payload.renderedReimbursements
            }
    }
    return state;
}
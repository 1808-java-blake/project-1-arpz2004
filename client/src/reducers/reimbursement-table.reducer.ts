import { IReimbursementTableState } from ".";
import { reimbursementTableTypes } from "../actions/reimbursement/reimbursement-table.types";

const initialState: IReimbursementTableState = {
    activePage: 1,
    filteredReimbursements: [],
    itemsCountPerPage: 2,
    reimbursements: [],
    renderedReimbursements: [],
    statusFilter: ["Pending", "Approved", "Denied"]
}

export const reimbursementTableReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case reimbursementTableTypes.FETCH_REIMBURSEMENTS:
            return {
                ...state,
                reimbursements: action.payload.reimbursements
            }
        case reimbursementTableTypes.FILTER_REIMBURSEMENTS:
            return {
                ...state,
                filteredReimbursements: action.payload.filteredReimbursements,
                statusFilter: action.payload.statusFilter
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
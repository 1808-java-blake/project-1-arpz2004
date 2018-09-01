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
            const startIndex = (state.activePage - 1) * state.itemsCountPerPage;
            const endIndex = startIndex + state.itemsCountPerPage;
            return {
                ...state,
                filteredReimbursements: action.payload.reimbursements,
                reimbursements: action.payload.reimbursements,
                renderedReimbursements: action.payload.reimbursements.slice(startIndex, endIndex),
            }
        case reimbursementTableTypes.FILTER_REIMBURSEMENTS:
            return {
                ...state,
                filteredReimbursements: action.payload.filteredReimbursements,
                renderedReimbursements: action.payload.renderedReimbursements,
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
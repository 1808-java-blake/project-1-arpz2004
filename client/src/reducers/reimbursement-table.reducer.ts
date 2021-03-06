import { IReimbursementTableState } from ".";
import { reimbursementTableTypes } from "../actions/reimbursement/reimbursement-table.types";

const initialState: IReimbursementTableState = {
    activePage: 1,
    customItemsCountPerPage: 0,
    detailsShown: [],
    filteredReimbursements: [],
    itemsCountPerPage: 10,
    reimbursements: [],
    renderedReimbursements: [],
    statusFilter: ["Pending", "Approved", "Denied"],
    usernameFilter: ''
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
        case reimbursementTableTypes.UPDATE_REIMBURSEMENT:
            const index = state.detailsShown.indexOf(action.payload.reimbursementId);
            const detailsShown = state.detailsShown.slice();
            if (index >= 0) {
                detailsShown.splice(index, 1)
            }
            return {
                ...state,
                detailsShown,
                reimbursements: state.reimbursements.map(reimbursement => {
                    return reimbursement.reimbursementId === action.payload.reimbursementId ? { ...reimbursement, status: action.payload.newStatus, resolved: action.payload.resolved, resolver: action.payload.resolver } : reimbursement;
                })
            }
        case reimbursementTableTypes.UPDATE_ITEMS_COUNT_PER_PAGE:
            return {
                ...state,
                itemsCountPerPage: action.payload.itemsCountPerPage
            }
        case reimbursementTableTypes.UPDATE_CUSTOM_ITEMS_COUNT_PER_PAGE:
            return {
                ...state,
                customItemsCountPerPage: action.payload.customItemsCountPerPage
            }
        case reimbursementTableTypes.UPDATE_DETAILS_SHOWN:
            return {
                ...state,
                detailsShown: action.payload.detailsShown
            }
        case reimbursementTableTypes.UPDATE_USERNAME_FILTER:
            return {
                ...state,
                usernameFilter: action.payload.usernameFilter
            }
    }
    return state;
}
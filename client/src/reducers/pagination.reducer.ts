import { IPaginationState } from ".";
import { paginationTypes } from "../actions/pagination/pagination.types";

const initialState: IPaginationState = {
    activePage: 1,
    itemsCountPerPage: 15,
    pageRangeDisplayed: 5,
    totalItemCount: 100
}

export const paginationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case paginationTypes.UPDATE_ACTIVE_PAGE:
            return {
                ...state,
                activePage: action.payload.activePage
            }
    }
    return state;
}
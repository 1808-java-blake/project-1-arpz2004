import { IPaginationState } from ".";

const initialState: IPaginationState = {
    activePage: 1,
    itemsCountPerPage: 15,
    pageRangeDisplayed: 5,
    totalItemCount: 0
}

export const paginationReducer = (state = initialState, action: any) => {
    return state;
}
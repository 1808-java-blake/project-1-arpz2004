import { currentUserTypes } from "../actions/current-user/current-user.types";
import { ICurrentUserState } from ".";

const initialState: ICurrentUserState = {
    currentUser: null
}

export const currentUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case currentUserTypes.UPDATE_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload.currentUser
            }
    }
    return state;
}
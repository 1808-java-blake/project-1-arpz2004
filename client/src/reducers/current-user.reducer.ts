import { currentUserTypes } from "../actions/current-user/current-user.types";

export const currentUserReducer = (state = null, action: any) => {
    switch (action.type) {
        case currentUserTypes.UPDATE_CURRENT_USER:
            return action.payload.currentUser;
    }
    return state;
}
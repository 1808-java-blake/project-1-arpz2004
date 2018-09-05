import { currentUserTypes } from "../actions/current-user/current-user.types";
import { User } from "../model/User";

const initialState: User | null = null

export const currentUserReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case currentUserTypes.UPDATE_CURRENT_USER:
            return action.payload.currentUser;
    }
    return state;
}
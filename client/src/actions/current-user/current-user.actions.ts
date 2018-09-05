import { currentUserTypes } from "./current-user.types";
import { User } from "../../model/User";

export const updateCurrentUser = (currentUser: User | null) => {
  return {
    payload: {
      currentUser
    },
    type: currentUserTypes.UPDATE_CURRENT_USER
  }
}
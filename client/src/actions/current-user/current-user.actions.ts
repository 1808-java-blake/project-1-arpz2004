import history from '../../history';
import { User } from "../../model/User";
import { currentUserTypes } from "./current-user.types";

export const updateCurrentUser = (currentUser: User | null) => {
  if (!currentUser) {
    sessionStorage.clear();
    history.push('/');
  }
  return {
    payload: {
      currentUser
    },
    type: currentUserTypes.UPDATE_CURRENT_USER
  }
}
import { combineReducers } from "redux";
import { createReimbursementReducer } from "./create-reimbursement.reducer";
import { currentUserReducer } from "./current-user.reducer"
import { signInReducer } from "./sign-in.reducer";
import { Reimbursement } from "../model/Reimbursement";
import { reimbursementTableReducer } from "./reimbursement-table.reducer";
import { User } from "../model/User";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  currentUser: User | null,
  errorMessage: string
}

export interface ICreateReimbursementState {
  reimbursement: Reimbursement,
  errorMessage: string
}

export interface IReimbursementTableState {
  reimbursements: Reimbursement[]
  filteredReimbursements: Reimbursement[]
  renderedReimbursements: Reimbursement[]
  activePage: number
  itemsCountPerPage: number
  statusFilter: string[]
}

export interface IState {
  createReimbursement: ICreateReimbursementState,
  currentUser: ICurrentUserState,
  reimbursementTable: IReimbursementTableState,
  signIn: ISignInState
}

export interface ICurrentUserState {
  currentUser: User | null
}

export const state = combineReducers<IState>({
  createReimbursement: createReimbursementReducer,
  currentUser: currentUserReducer,
  reimbursementTable: reimbursementTableReducer,
  signIn: signInReducer
})
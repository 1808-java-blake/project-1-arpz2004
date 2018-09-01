import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { Reimbursement } from "../model/Reimbursement";
import { reimbursementTableReducer } from "./reimbursement-table.reducer";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  errorMessage: string
}

export interface IReimbursementTableState {
  reimbursements: Reimbursement[]
  renderedReimbursements: Reimbursement[]
  activePage: number
  itemsCountPerPage: number
}

export interface IState {
  reimbursementTable: IReimbursementTableState,
  signIn: ISignInState
}

export const state = combineReducers<IState>({
  reimbursementTable: reimbursementTableReducer,
  signIn: signInReducer
})
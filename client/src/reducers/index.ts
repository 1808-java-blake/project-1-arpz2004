import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { paginationReducer } from "./pagination.reducer";
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
}

export interface IPaginationState {
  totalItemCount: number,
  activePage: number,
  itemsCountPerPage: number,
  pageRangeDisplayed: number
}

export interface IState {
  pagination: IPaginationState,
  reimbursementTable: IReimbursementTableState,
  signIn: ISignInState
}

export const state = combineReducers<IState>({
  pagination: paginationReducer,
  reimbursementTable: reimbursementTableReducer,
  signIn: signInReducer
})
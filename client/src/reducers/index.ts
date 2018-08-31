import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { reimbursementReducer } from "./reimbursement.reducer";
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

export interface IReimbursementState {
  reimbursement: Reimbursement
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
  reimbursement: IReimbursementState,
  reimbursementTable: IReimbursementTableState,
  signIn: ISignInState
}

export const state = combineReducers<IState>({
  pagination: paginationReducer,
  reimbursement: reimbursementReducer,
  reimbursementTable: reimbursementTableReducer,
  signIn: signInReducer
})
import { combineReducers } from "redux";
import { signInReducer } from "./sign-in.reducer";
import { reimbursementReducer } from "./reimbursement.reducer";
import { paginationReducer } from "./pagination.reducer";

export interface ISignInState {
  credentials: {
    password: string,
    username: string
  },
  errorMessage: string
}

export interface IReimbursementState {
  reimbursementId: number,
  amount: number,
  submitted: number,
  resolved: number,
  description: string,
  status: string,
  type: string
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
  signIn: ISignInState
}

export const state = combineReducers<IState>({
  pagination: paginationReducer,
  reimbursement: reimbursementReducer,
  signIn: signInReducer
})
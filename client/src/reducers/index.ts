import { combineReducers } from "redux";
import { createReimbursementReducer } from "./create-reimbursement.reducer";
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
  reimbursementTable: IReimbursementTableState,
  signIn: ISignInState
}

export const state = combineReducers<IState>({
  createReimbursement: createReimbursementReducer,
  reimbursementTable: reimbursementTableReducer,
  signIn: signInReducer
})
import { reimbursementTableTypes } from "./reimbursement-table.types";
import { Reimbursement } from "../../model/Reimbursement";

export const fetchReimbursements = () => (dispatch: any) => {
  fetch('http://localhost:9001/reimbursements')
    .then(resp => {
      if (resp.status === 200) {
        return resp.json();
      } else {
        throw new Error('Failed to fetch reimbursements');
      }
    }).then(resp => {
      dispatch({
        payload: {
          reimbursements: resp
        },
        type: reimbursementTableTypes.FETCH_REIMBURSEMENTS
      })
    })
    .catch(err => {
      console.log(err);
    });
}

export const filterReimbursements = (filteredReimbursements: Reimbursement[], statusFilter: string[]) => (dispatch: any) => {
  dispatch({
    payload: {
      filteredReimbursements,
      statusFilter
    },
    type: reimbursementTableTypes.FILTER_REIMBURSEMENTS
  })
}

export const updateActivePage = (activePage: number, filteredReimbursements: Reimbursement[], itemsCountPerPage: number) => (dispatch: any) => {
  const startIndex = (activePage - 1) * itemsCountPerPage;
  const endIndex = startIndex + itemsCountPerPage;
  const renderedReimbursements = filteredReimbursements.slice(startIndex, endIndex)
  dispatch({
    payload: {
      activePage,
      renderedReimbursements
    },
    type: reimbursementTableTypes.UPDATE_ACTIVE_PAGE
  })
}
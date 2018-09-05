import { getCurrentUser } from "../../App";
import { Reimbursement } from "../../model/Reimbursement";
import { reimbursementTableTypes } from "./reimbursement-table.types";

export const fetchReimbursements = () => (dispatch: any) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    let fetchUrl = '';
    if (currentUser.role === "Manager") {
      fetchUrl = 'http://localhost:9001/reimbursements';
    } else {
      fetchUrl = `http://localhost:9001/users/${currentUser.userId}/reimbursements`;
    }
    fetch(fetchUrl)
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
  const maxPage = Math.ceil(filteredReimbursements.length / itemsCountPerPage);
  if (activePage >= maxPage && maxPage > 0) {
    activePage = maxPage;
  }
  const startIndex = (activePage - 1) * itemsCountPerPage;
  const endIndex = startIndex + itemsCountPerPage;
  const renderedReimbursements = filteredReimbursements.slice(startIndex, endIndex);
  dispatch({
    payload: {
      activePage,
      renderedReimbursements
    },
    type: reimbursementTableTypes.UPDATE_ACTIVE_PAGE
  })
}
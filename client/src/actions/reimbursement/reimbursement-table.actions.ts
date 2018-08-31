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

export const filterReimbursements = (renderedReimbursements: Reimbursement[]) => (dispatch: any) => {
  dispatch({
    payload: {
      renderedReimbursements
    },
    type: reimbursementTableTypes.FILTER_REIMBURSEMENTS
  })
}
import { reimbursementTableTypes } from "./reimbursement-table.types";

export const fetchReimbursements = () => (dispatch: any) => {
  console.log("BEGIN FETCH")
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


import { reimbursementTableTypes } from "./reimbursement-table.types";
import { Reimbursement } from "../../model/Reimbursement";

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
      console.log(resp);
      const reim: Reimbursement[] = resp.map((reimb: any) => {
        return new Reimbursement(reimb);
      });
      console.log(reim)
      dispatch({
        payload: {
          reimbursements: reim
        },
        type: reimbursementTableTypes.FETCH_REIMBURSEMENTS
      })
    })
    .catch(err => {
      console.log(err);
    });
}


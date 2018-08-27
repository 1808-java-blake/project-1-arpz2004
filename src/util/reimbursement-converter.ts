import { Reimbursement } from "../model/reimbursement";
import { SqlReimbursement } from "../dto/sql-reimbursement";

export function reimbursementConverter(reimbursement: SqlReimbursement) {
  return new Reimbursement(reimbursement.reimbursement_id, undefined, undefined, reimbursement.amount, reimbursement.submitted, reimbursement.resolved, reimbursement.description);
}
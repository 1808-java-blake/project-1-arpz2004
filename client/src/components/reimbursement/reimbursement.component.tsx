import * as React from 'react';
import { Reimbursement } from '../../model/Reimbursement';

interface IProps {
  reimbursement: Reimbursement
}

export const ReimbursementComponent: React.StatelessComponent<IProps> = (props) => {
  const { reimbursement } = props;
  return (
    <tr>
      <th scope="row">{reimbursement.reimbursementId}</th>
      <td>{reimbursement.amount}</td>
      <td>{reimbursement.submitted}</td>
      <td>{reimbursement.description}</td>
      <td>{reimbursement.status}</td>
      <td>{reimbursement.type}</td>
    </tr>
  );
}
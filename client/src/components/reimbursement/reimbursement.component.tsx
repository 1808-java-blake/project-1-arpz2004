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
      <td>${reimbursement.amount}</td>
      <td>{formatTime(reimbursement.submitted)}</td>
      <td>{reimbursement.resolved && formatTime(reimbursement.resolved)}</td>
      <td>{reimbursement.description}</td>
      <td>{reimbursement.author.username}</td>
      <td>{reimbursement.resolver && reimbursement.resolver.username}</td>
      <td>{reimbursement.status}</td>
      <td>{reimbursement.type}</td>
    </tr>
  );
}

const formatTime = (time: Date) => {
  time = new Date(time)
  let h = time.getHours();
  const amPm = h < 12 ? 'AM' : 'PM';
  h = h > 12 ? h - 12 : h;
  h = h === 0 ? 12 : h;
  const minutes = time.getMinutes();
  const m = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = time.getSeconds();
  const s = seconds < 10 ? `0${seconds}` : seconds;
  const yyyy = time.getFullYear();
  const month = time.getMonth();
  const mm = month < 10 ? `0${month}` : month;
  const day = time.getDay();
  const dd = day < 10 ? `0${day}` : day;
  return <div>{yyyy}-{mm}-{dd}<br />{h}:{m}:{s} {amPm}</div>;
}
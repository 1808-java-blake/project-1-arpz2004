import * as React from 'react';
import { Reimbursement } from '../../model/Reimbursement';
import { getCurrentUser } from '../../App';
import Collapse from 'reactstrap/lib/Collapse';

interface IProps {
  reimbursement: Reimbursement
  changeStatus: (reimbursementId: number, newStatus: string) => void
  toggleDetails: () => void
  showDetails: boolean
}

export const ReimbursementComponent: React.StatelessComponent<IProps> = (props) => {
  const { reimbursement, changeStatus, showDetails, toggleDetails } = props;
  const currentUser = getCurrentUser();
  const managerColumn = currentUser && currentUser.role === "Manager";
  return (
    <>
      <tr className="reimbursement-table-row">
        <th scope="row"><span onClick={toggleDetails}>{reimbursement.reimbursementId}</span></th>
        <td><span onClick={toggleDetails}>${reimbursement.amount}</span></td>
        <td><span onClick={toggleDetails}>{formatDate(reimbursement.submitted)}</span></td>
        <td><span onClick={toggleDetails}>{reimbursement.author.username}</span></td>
        <td><span onClick={toggleDetails}>{reimbursement.resolver && reimbursement.resolver.username}</span></td>
        <td><span onClick={toggleDetails}>{reimbursement.status}</span></td>
        <td><span onClick={toggleDetails}>{reimbursement.type}</span></td>
        {managerColumn ?
          <td className="text-center">
            {reimbursement.status === "Pending" ?
              (
                <div className="btn-group">
                  <button type="button" className="btn btn-secondary btn-success" onClick={() => changeStatus(reimbursement.reimbursementId, "Approved")}>Approve</button>
                  <button type="button" className="btn btn-secondary btn-danger" onClick={() => changeStatus(reimbursement.reimbursementId, "Denied")}>Deny</button>
                </div>
              ) :
              <></>
            }
          </td> :
          <></>
        }
      </tr>
      <tr onClick={toggleDetails} className="extra-reimbursement-details">
        <td colSpan={managerColumn ? 8 : 7} className="hidden-row">
          <Collapse isOpen={showDetails}>
            <div className="container">
              <div className="row">
                <div className="col-md-8">
                  <dl className="row">
                    <dt className="col-sm-3">Description</dt>
                    <dd className="col-sm-9">{reimbursement.description}</dd>

                    <dt className="col-sm-3">Resolved</dt>
                    <dd className="col-sm-9">
                      {reimbursement.resolved && formatTime(reimbursement.resolved)}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </Collapse>
        </td>
      </tr>
    </>
  );
}

const formatDate = (time: Date) => {
  time = new Date(time)
  const yyyy = time.getFullYear();
  const month = time.getMonth();
  const mm = month < 10 ? `0${month}` : month;
  const day = time.getDay();
  const dd = day < 10 ? `0${day}` : day;
  return <>{yyyy}-{mm}-{dd}</>;
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
  return <>{yyyy}-{mm}-{dd} {h}:{m}:{s} {amPm}</>;
}
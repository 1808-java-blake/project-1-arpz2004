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
        {managerColumn ?
          <td><span onClick={toggleDetails}>{reimbursement.author.username}</span></td>
          : <></>
        }
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
        <td colSpan={managerColumn ? 7 : 6} className="hidden-row">
          <Collapse isOpen={showDetails}>
            <div className="container">
              <div className="row">
                <div className="col-lg-6">
                  <dl className="row">
                    <dt className="col-lg-3">Description</dt>
                    <dd className="col-lg-9">{reimbursement.description}</dd>
                    <dt className="col-lg-3">Submitted</dt>
                    <dd className="col-lg-9">
                      {reimbursement.submitted && formatTime(reimbursement.submitted)}
                    </dd>
                    {reimbursement.resolved ? (<>
                      <dt className="col-lg-3">Resolved</dt>
                      <dd className="col-lg-9">
                        {formatTime(reimbursement.resolved)}
                      </dd></>) : null
                    }
                  </dl>
                </div>
                <div className="col-lg-6">
                  <dl className="row">
                    <dt className="col-lg-3">Requested By</dt>
                    <dd className="col-lg-9">
                      {reimbursement.author.username}
                    </dd>
                    <dt className="col-lg-3">Name</dt>
                    <dd className="col-sm-9">
                      {reimbursement.author.firstName + ' ' + reimbursement.author.lastName}
                    </dd>
                    <dt className="col-lg-3">Email</dt>
                    <dd className="col-lg-9">
                      {reimbursement.author.email}
                    </dd>
                    {managerColumn && reimbursement.resolved && reimbursement.resolver ?
                      (<><dt className="col-lg-3">Resolved By</dt>
                        <dd className="col-lg-9">
                          {reimbursement.resolver.username}
                        </dd>
                        <dt className="col-lg-3">Name</dt>
                        <dd className="col-lg-9">
                          {reimbursement.resolver.firstName + ' ' + reimbursement.resolver.lastName}
                        </dd>
                        <dt className="col-lg-3">Email</dt>
                        <dd className="col-lg-9">
                          {reimbursement.resolver.email}
                        </dd></>) : <></>
                    }
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
  const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  time = new Date(time)
  const yyyy = time.getFullYear();
  const month = time.getMonth();
  const day = time.getDate();
  const dd = day < 10 ? `0${day}` : day;
  return <>{mS[month]} {dd}, {yyyy}</>;
}

const formatTime = (time: Date) => {
  const mS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
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
  const day = time.getDate();
  const dd = day < 10 ? `0${day}` : day;
  return <>{mS[month]} {dd}, {yyyy} {h}:{m}:{s} {amPm}</>;
}
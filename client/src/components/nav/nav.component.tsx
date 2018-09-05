import * as React from 'react';
import { Link } from 'react-router-dom';
import RevLogo from '../../assets/rev-logo.png';
import { getCurrentUser } from '../../App';
import { User } from '../../model/User';

const createLink = (path: string, name: string) => {
  return (<li className="nav-item active">
    <Link to={path} className="unset-anchor nav-link">{name}</Link>
  </li>);
}

export const AppNav: React.StatelessComponent<any> = (props) => {
  const currentUser: User | null = getCurrentUser();
  let signInLink = null;
  let reimbursementsLink = null;
  let createReimbursementLink = null;
  if (currentUser) {
    reimbursementsLink = createLink("/reimbursements", "Reimbursements");
    if (!currentUser.isManager()) {
      createReimbursementLink = createLink("/reimbursements/new", "Create Reimbursement");
    }
  } else {
    signInLink = createLink("/sign-in", "Sign In");
  }
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/home" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src={RevLogo} alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            {signInLink}
            {reimbursementsLink}
            {createReimbursementLink}
          </ul>
        </div>
      </nav>
    </div >
  );
}
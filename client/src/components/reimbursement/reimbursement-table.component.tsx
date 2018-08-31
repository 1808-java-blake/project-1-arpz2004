import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import PaginationComponent from '../pagination/pagination.component';
// import ReimbursementComponent from './reimbursement.component';
import { Reimbursement } from '../../model/Reimbursement';
import * as reimbursementTableActions from '../../actions/reimbursement/reimbursement-table.actions';

class ReimbursementTableComponent extends React.Component<any, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        this.props.fetchReimbursements();
    }

    public render() {
        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Submitted</th>
                            <th scope="col">Description</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.reimbursements.map((reimbursement: Reimbursement) => {
                            return (<tr key={reimbursement.reimbursementId}>
                                <th scope="row">{reimbursement.reimbursementId}</th>
                                <td>{reimbursement.amount}</td>
                                <td>{reimbursement.submitted}</td>
                                <td>{reimbursement.description}</td>
                                <td>{reimbursement.status}</td>
                                <td>{reimbursement.type}</td>
                            </tr>)
                        })}
                    </tbody>
                </table>
                <PaginationComponent />
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => state.reimbursementTable

const mapDispatchToProps = {
    fetchReimbursements: reimbursementTableActions.fetchReimbursements
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementTableComponent);

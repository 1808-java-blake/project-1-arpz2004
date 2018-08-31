import * as React from 'react';
import { connect } from 'react-redux';
import { IState } from '../../reducers';
import PaginationComponent from '../pagination/pagination.component';
import { Reimbursement } from '../../model/Reimbursement';
import * as reimbursementTableActions from '../../actions/reimbursement/reimbursement-table.actions';
import { ReimbursementComponent } from './reimbursement.component';

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
                            <th scope="col">Resolved</th>
                            <th scope="col">Description</th>
                            <th scope="col">Author</th>
                            <th scope="col">Resolver</th>
                            <th scope="col">Status</th>
                            <th scope="col">Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.renderedReimbursements.map((reimbursement: Reimbursement) => {
                            return <ReimbursementComponent key={reimbursement.reimbursementId} reimbursement={reimbursement} />
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
    fetchReimbursements: reimbursementTableActions.fetchReimbursements,
    filterReimbursements: reimbursementTableActions.filterReimbursements
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementTableComponent);

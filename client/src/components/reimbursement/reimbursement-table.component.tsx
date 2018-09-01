import * as React from 'react';
import { PaginationComponent } from '../pagination/pagination.component';
import { Reimbursement } from '../../model/Reimbursement';
import { ReimbursementComponent } from './reimbursement.component';
import * as reimbursementTableActions from '../../actions/reimbursement/reimbursement-table.actions'
import { IState } from '../../reducers';
import { connect } from 'react-redux';

class ReimbursementTableComponent extends React.Component<any, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        this.props.fetchReimbursements();
    }

    public render() {
        return (
            <div className="container">
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
                <PaginationComponent activePage={this.props.activePage} totalItemsCount={this.props.renderedReimbursements.length} updateActivePage={(page: number) => this.props.updateActivePage(page)} />
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => state.reimbursementTable

const mapDispatchToProps = {
    fetchReimbursements: reimbursementTableActions.fetchReimbursements,
    filterReimbursements: reimbursementTableActions.filterReimbursements,
    updateActivePage: reimbursementTableActions.updateActivePage
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementTableComponent);

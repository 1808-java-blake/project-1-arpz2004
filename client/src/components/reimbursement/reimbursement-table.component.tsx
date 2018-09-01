import * as React from 'react';
import { PaginationComponent } from '../pagination/pagination.component';
import { Reimbursement } from '../../model/Reimbursement';
import { ReimbursementComponent } from './reimbursement.component';
import * as reimbursementTableActions from '../../actions/reimbursement/reimbursement-table.actions'
import { IState, IReimbursementTableState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { ButtonToolbar, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';

interface IProps extends RouteComponentProps<{}>, IReimbursementTableState {
    fetchReimbursements: () => void,
    updateActivePage: (page: number, renderedReimbursements: Reimbursement[]) => void
}

class ReimbursementTableComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        this.props.fetchReimbursements();
    }

    public render() {
        return (
            <div className="container">
                <ButtonToolbar>
                    <ToggleButtonGroup type="checkbox" defaultValue={[1, 3]}>
                        <ToggleButton value={1}>Pending</ToggleButton>
                        <ToggleButton value={2}>Approved</ToggleButton>
                        <ToggleButton value={3}>Denied</ToggleButton>
                    </ToggleButtonGroup>
                </ButtonToolbar>
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
                <PaginationComponent activePage={this.props.activePage} itemsCountPerPage={this.props.itemsCountPerPage} totalItemsCount={this.props.reimbursements.length} updateActivePage={(page: number) => this.renderPage(page, this.props.itemsCountPerPage, this.props.reimbursements)} />
            </div>
        );
    }

    private renderPage = (pageNumber: number, countPerPage: number, reimbursements: Reimbursement[]) => {
        const startIndex = (pageNumber - 1) * countPerPage;
        const endIndex = startIndex + countPerPage;
        this.props.updateActivePage(pageNumber, reimbursements.slice(startIndex, endIndex));
    }
}

const mapStateToProps = (state: IState) => state.reimbursementTable

const mapDispatchToProps = {
    fetchReimbursements: reimbursementTableActions.fetchReimbursements,
    filterReimbursements: reimbursementTableActions.filterReimbursements,
    updateActivePage: reimbursementTableActions.updateActivePage
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementTableComponent);

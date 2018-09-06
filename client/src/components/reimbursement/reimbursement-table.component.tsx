import * as React from 'react';
import { ButtonToolbar, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import * as reimbursementTableActions from '../../actions/reimbursement/reimbursement-table.actions';
import { getCurrentUser } from '../../App';
import { Reimbursement } from '../../model/Reimbursement';
import { IReimbursementTableState, IState } from '../../reducers';
import { PaginationComponent } from '../pagination/pagination.component';
import { ReimbursementComponent } from './reimbursement.component';
import NumberFormat from 'react-number-format';

interface IProps extends RouteComponentProps<{}>, IReimbursementTableState {
    fetchReimbursements: () => void,
    filterReimbursements: (reimbursements: Reimbursement[], statusFilter: string[]) => void
    updateReimbursement: (reimbursementId: number, newStatus: string) => void
    updateActivePage: (activePage: number, filteredReimbursements: Reimbursement[], itemsCountPerPage: number) => void,
    updateItemsCountPerPage: (itemsCountPerPage: number) => void,
    updateCustomItemsCountPerPage: (itemsCountPerPage: number) => void
}

class ReimbursementTableComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        this.props.fetchReimbursements();
    }

    public componentDidUpdate(prevProps: IProps) {
        if (this.props.reimbursements !== prevProps.reimbursements) {
            this.filterByStatus(this.props.statusFilter);
        }
        if (this.props.filteredReimbursements !== prevProps.filteredReimbursements || this.props.itemsCountPerPage !== prevProps.itemsCountPerPage) {
            this.props.updateActivePage(this.props.activePage, this.props.filteredReimbursements, this.props.itemsCountPerPage);
        }
    }

    public filterByStatus = (statusArray: string[]) => {
        const filteredReimbursements = this.props.reimbursements.filter(reimbursement => {
            return statusArray.indexOf(reimbursement.status) >= 0;
        });
        this.props.filterReimbursements(filteredReimbursements, statusArray);
    }

    public render() {
        const filteredReimbursements = this.props.filteredReimbursements;
        const numberOfFilteredReimbursements = filteredReimbursements.length;
        const currentUser = getCurrentUser();
        const managerColumn = currentUser && currentUser.role === "Manager" ? <th scope="col">Approve/Deny</th> : null;
        return (
            <div className="container">
                <div className="d-flex justify-content-between">
                    <ButtonToolbar>
                        <ToggleButtonGroup onChange={this.filterByStatus} type="checkbox" defaultValue={this.props.statusFilter}>
                            <ToggleButton bsStyle={"warning"} value={"Pending"}>Pending</ToggleButton>
                            <ToggleButton bsStyle={"success"} value={"Approved"}>Approved</ToggleButton>
                            <ToggleButton bsStyle={"danger"} value={"Denied"}>Denied</ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                    <ButtonToolbar>
                        <ToggleButtonGroup
                            className="input-container"
                            onChange={this.props.updateItemsCountPerPage}
                            type="radio" name="options"
                            defaultValue={this.props.itemsCountPerPage}>
                            <ToggleButton value={5}><span className="container">5</span></ToggleButton>
                            <ToggleButton value={10}><span className="container">10</span></ToggleButton>
                            <ToggleButton value={25}><span className="container">25</span></ToggleButton>
                            <ToggleButton value={this.props.customItemsCountPerPage}>
                                <span className="container">
                                    <NumberFormat
                                        allowNegative={false}
                                        isNumericString={true}
                                        onValueChange={(values) => this.props.updateCustomItemsCountPerPage(values.floatValue)}
                                        value={this.props.customItemsCountPerPage === 0 ? '' : this.props.customItemsCountPerPage}
                                        id="custom-page-input"
                                        isAllowed={(val) => +val.value < 100 && val.value.length <= 2} />
                                </span>
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </ButtonToolbar>
                </div>
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
                            {managerColumn}
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.renderedReimbursements.map((reimbursement: Reimbursement) => {
                            return <ReimbursementComponent key={reimbursement.reimbursementId} reimbursement={reimbursement} changeStatus={(reimbursementId: number, newStatus: string) => this.props.updateReimbursement(reimbursementId, newStatus)} />
                        })}
                    </tbody>
                </table>
                <div className="float-right">
                    <PaginationComponent
                        activePage={this.props.activePage}
                        itemsCountPerPage={this.props.itemsCountPerPage}
                        totalItemsCount={numberOfFilteredReimbursements ? numberOfFilteredReimbursements : 1}
                        updateActivePage={(page: number) => this.props.updateActivePage(page, filteredReimbursements, this.props.itemsCountPerPage)} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: IState) => state.reimbursementTable

const mapDispatchToProps = {
    fetchReimbursements: reimbursementTableActions.fetchReimbursements,
    filterReimbursements: reimbursementTableActions.filterReimbursements,
    updateActivePage: reimbursementTableActions.updateActivePage,
    updateCustomItemsCountPerPage: reimbursementTableActions.updateCustomItemsCountPerPage,
    updateItemsCountPerPage: reimbursementTableActions.updateItemsCountPerPage,
    updateReimbursement: reimbursementTableActions.updateReimbursement
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementTableComponent);

import * as React from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, ButtonGroup } from 'reactstrap';
import Card from 'reactstrap/lib/Card';
import CardHeader from 'reactstrap/lib/CardHeader';
import * as reimbursementTableActions from '../../actions/reimbursement/reimbursement-table.actions';
import { getCurrentUser } from '../../App';
import { Reimbursement } from '../../model/Reimbursement';
import { IReimbursementTableState, IState } from '../../reducers';
import { PaginationComponent } from '../pagination/pagination.component';
import { ReimbursementComponent } from './reimbursement.component';

interface IProps extends RouteComponentProps<{}>, IReimbursementTableState {
    fetchReimbursements: () => void,
    filterReimbursements: (reimbursements: Reimbursement[], statusFilter: string[]) => void
    updateReimbursement: (reimbursementId: number, newStatus: string) => void
    updateDetailsShown: (reimbursementIds: number[]) => void
    updateActivePage: (activePage: number, filteredReimbursements: Reimbursement[], itemsCountPerPage: number) => void,
    updateItemsCountPerPage: (itemsCountPerPage: number) => void,
    updateCustomItemsCountPerPage: (itemsCountPerPage: number) => void,
    updateUsernameFilter: (usernameFilter: string) => void
}

class ReimbursementTableComponent extends React.Component<IProps, {}> {

    constructor(props: any) {
        super(props);
    }

    public componentDidMount = () => {
        this.props.fetchReimbursements();
    }

    public componentDidUpdate(prevProps: IProps) {
        if (this.props.reimbursements !== prevProps.reimbursements || this.props.usernameFilter !== prevProps.usernameFilter) {
            this.filterByStatusAndUsername(this.props.statusFilter);
        }
        if (this.props.customItemsCountPerPage !== prevProps.customItemsCountPerPage) {
            this.props.updateItemsCountPerPage(this.props.customItemsCountPerPage);
        }
        if (this.props.filteredReimbursements !== prevProps.filteredReimbursements || this.props.itemsCountPerPage !== prevProps.itemsCountPerPage) {
            this.props.updateActivePage(this.props.activePage, this.props.filteredReimbursements, this.props.itemsCountPerPage);
        }
    }

    public filterByStatusAndUsername = (statusArray: string[]) => {
        let filteredReimbursements = this.props.reimbursements.filter(reimbursement => {
            return statusArray.indexOf(reimbursement.status) >= 0;
        });
        const usernameFilter = this.props.usernameFilter;
        if (usernameFilter) {
            filteredReimbursements = filteredReimbursements.filter(reimbursement => reimbursement.author.username.indexOf(usernameFilter) >= 0);
            filteredReimbursements = filteredReimbursements.filter(reimbursement => reimbursement.author.username === usernameFilter).concat(filteredReimbursements.filter(reimbursement => reimbursement.author.username !== usernameFilter));
        }
        this.props.filterReimbursements(filteredReimbursements, statusArray);
    }

    public toggleFilter = (oldStatusFilter: string[], status: string) => {
        return oldStatusFilter.some(filter => filter === status) ? oldStatusFilter.filter(filter => filter !== status) : oldStatusFilter.slice().concat(status);
    }

    public toggleDetailsShown = (oldDetailsShown: number[], reimbursementId: number) => {
        return oldDetailsShown.some(filter => filter === reimbursementId) ? oldDetailsShown.filter(filter => filter !== reimbursementId) : oldDetailsShown.slice().concat(reimbursementId);
    }

    public render() {
        const { filteredReimbursements, statusFilter, itemsCountPerPage, usernameFilter } = this.props;
        const numberOfFilteredReimbursements = filteredReimbursements.length;
        const currentUser = getCurrentUser();
        const requestedByColumn = currentUser && currentUser.role === "Manager" ? <th scope="col">Requested By</th> : null;
        const managerColumn = currentUser && currentUser.role === "Manager" ? <th scope="col" className="text-center">Approve/Deny</th> : null;
        const filterByUsernameInput = currentUser && currentUser.role === "Manager" ?
            <input
                id="inputUsernameFilter"
                placeholder="Filter by username"
                type="text"
                onChange={(e: any) => this.props.updateUsernameFilter(e.target.value)}
                value={usernameFilter} /> : null
        const custPerPage = this.props.customItemsCountPerPage;
        return (
            <div className="container">
                <Card>
                    <CardHeader className="text-white bg-dark">
                        <div className="d-flex justify-content-between stacked-buttons">
                            <span className="my-auto">Reimbursement Request History</span>
                            {filterByUsernameInput}
                            <ButtonGroup className="reimbursement-table-buttons">
                                <Button outline color="warning" onClick={() => this.filterByStatusAndUsername(this.toggleFilter(statusFilter, "Pending"))} active={statusFilter.indexOf("Pending") >= 0}>Pending</Button>
                                <Button outline color="success" onClick={() => this.filterByStatusAndUsername(this.toggleFilter(statusFilter, "Approved"))} active={statusFilter.indexOf("Approved") >= 0}>Approved</Button>
                                <Button outline color="danger" onClick={() => this.filterByStatusAndUsername(this.toggleFilter(statusFilter, "Denied"))} active={statusFilter.indexOf("Denied") >= 0}>Denied</Button>
                            </ButtonGroup>
                            <ButtonGroup>
                                <Button color="primary" onClick={() => this.props.updateItemsCountPerPage(5)} active={itemsCountPerPage === 5}>5</Button>
                                <Button color="primary" onClick={() => this.props.updateItemsCountPerPage(10)} active={itemsCountPerPage === 10}>10</Button>
                                <Button color="primary" onClick={() => this.props.updateItemsCountPerPage(25)} active={itemsCountPerPage === 25}>25</Button>
                                <Button color="primary" onClick={() => this.props.updateItemsCountPerPage(custPerPage ? custPerPage : 1)} active={itemsCountPerPage === (custPerPage ? custPerPage : 1)}>
                                    <NumberFormat
                                        allowNegative={false}
                                        isNumericString={true}
                                        onValueChange={(values) => this.props.updateCustomItemsCountPerPage(values.floatValue ? values.floatValue : custPerPage)}
                                        value={custPerPage === 0 ? '' : custPerPage}
                                        id="custom-page-input"
                                        isAllowed={(val) => +val.value < 100 && val.value.length <= 2} />
                                </Button>
                            </ButtonGroup>
                        </div>
                    </CardHeader>
                </Card>
                <div className="table-responsive">
                    <table className="table table-striped">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Submitted</th>
                                {requestedByColumn}
                                <th scope="col"><span id="status-col">Status</span></th>
                                <th scope="col"><span id="type-col">Type</span></th>
                                {managerColumn}
                            </tr>
                        </thead>
                        <tbody>
                            <tr><td className="hidden-row"></td></tr>
                            {this.props.renderedReimbursements.map((reimbursement: Reimbursement) => {
                                return <ReimbursementComponent showDetails={this.props.detailsShown.indexOf(reimbursement.reimbursementId) >= 0} toggleDetails={() => this.props.updateDetailsShown(this.toggleDetailsShown(this.props.detailsShown, reimbursement.reimbursementId))} key={reimbursement.reimbursementId} reimbursement={reimbursement} changeStatus={(reimbursementId: number, newStatus: string) => this.props.updateReimbursement(reimbursementId, newStatus)} />
                            })}
                        </tbody>
                    </table>
                </div>
                {this.props.filteredReimbursements.length === 0 &&
                    <div className="container">
                        <div className="row">
                            <div id="no-reimbursements-msg" className="mx-auto">
                                <div className="alert alert-info" role="alert">
                                    <span>There are no reimbursement requests that match the current filter.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                }
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
    updateDetailsShown: reimbursementTableActions.updateDetailsShown,
    updateItemsCountPerPage: reimbursementTableActions.updateItemsCountPerPage,
    updateReimbursement: reimbursementTableActions.updateReimbursement,
    updateUsernameFilter: reimbursementTableActions.updateUsernameFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(ReimbursementTableComponent);

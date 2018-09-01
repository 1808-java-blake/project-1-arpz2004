import * as React from 'react';
import { PaginationComponent } from '../pagination/pagination.component';
import { Reimbursement } from '../../model/Reimbursement';
import { ReimbursementComponent } from './reimbursement.component';
import * as reimbursementTableActions from '../../actions/reimbursement/reimbursement-table.actions'
import { IState, IReimbursementTableState } from '../../reducers';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';

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
                <div className="col-xs-6">
                    <h3 className="text-center">Colorful Example</h3>
                    <div className="well" id="reimbursement-status">
                        <ul id="check-list-box" className="list-group checked-list-box">
                            <li className="list-group-item">Cras justo odio</li>
                            <li className="list-group-item" data-color="success">Dapibus ac facilisis in</li>
                            <li className="list-group-item" data-color="info">Morbi leo risus</li>
                            <li className="list-group-item" data-color="warning">Porta ac consectetur ac</li>
                            <li className="list-group-item" data-color="danger">Vestibulum at eros</li>
                        </ul>
                        <br />
                        <button className="btn btn-primary col-xs-12" id="get-checked-data">Get Checked Data</button>
                    </div>
                    <pre id="display-json"></pre>
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

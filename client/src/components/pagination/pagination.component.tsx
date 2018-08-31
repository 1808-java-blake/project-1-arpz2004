import * as React from "react";
import Pagination from "react-js-pagination";
import { IPaginationState, IState } from "../../reducers";
import * as paginationActions from '../../actions/pagination/pagination.actions';
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";

interface IProps extends RouteComponentProps<{}>, IPaginationState {
  updateActivePage: (activePage: number) => void
}

class PaginationComponent extends React.Component<IProps, {}>  {
  constructor(props: any) {
    super(props);
  }

  public handlePageChange = (pageNumber: number) => {
    this.props.updateActivePage(pageNumber);
  }

  public render() {
    return (
      <div>
        <Pagination
          activePage={this.props.activePage}
          itemsCountPerPage={10}
          totalItemsCount={this.props.totalItemCount}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
          itemClass={'page-item'}
          linkClass={'page-link'}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => state.pagination

const mapDispatchToProps = {
  updateActivePage: paginationActions.updateActivePage
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
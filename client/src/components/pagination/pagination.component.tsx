import * as React from "react";
import Pagination from "react-js-pagination";
import { IPaginationState, IState } from "../../reducers";
import { connect } from "react-redux";

class PaginationComponent extends React.Component<IPaginationState, {}>  {
  constructor(props: any) {
    super(props);
    this.state = {
      activePage: 15
    };
  }

  public handlePageChange(pageNumber: number) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
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
        />
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => { state.pagination }

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginationComponent);
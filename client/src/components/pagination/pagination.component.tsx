import * as React from "react";
import Pagination from "react-js-pagination";

interface IProps {
  updateActivePage: (activePage: number) => void
  activePage: number
  totalItemsCount: number
  itemsCountPerPage: number
}

export const PaginationComponent: React.StatelessComponent<IProps> = (props) => {
  const { activePage, totalItemsCount, updateActivePage, itemsCountPerPage } = props;
  return (
    <div>
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        onChange={updateActivePage}
        itemClass={'page-item'}
        linkClass={'page-link'}
      />
    </div>
  );
}
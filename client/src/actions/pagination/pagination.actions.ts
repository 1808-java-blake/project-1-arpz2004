import { paginationTypes } from "./pagination.types";

export const updateActivePage = (activePage: number) => {
  return {
    payload: {
      activePage
    },
    type: paginationTypes.UPDATE_ACTIVE_PAGE
  }
}

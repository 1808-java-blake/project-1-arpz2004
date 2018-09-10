import { getCurrentUser } from "../../App";
import { Reimbursement } from "../../model/Reimbursement";
import { reimbursementTableTypes } from "./reimbursement-table.types";
import { environment } from '../../environment';

export const fetchReimbursements = () => (dispatch: any) => {
  const currentUser = getCurrentUser();
  if (currentUser) {
    let fetchUrl = '';
    if (currentUser.role === "Manager") {
      fetchUrl = `${environment.context}reimbursements`;
    } else {
      fetchUrl = `${environment.context}users/${currentUser.userId}/reimbursements`;
    }
    fetch(fetchUrl, {
      credentials: 'include'
    })
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          throw new Error('Failed to fetch reimbursements');
        }
      }).then(resp => {
        dispatch({
          payload: {
            reimbursements: resp
          },
          type: reimbursementTableTypes.FETCH_REIMBURSEMENTS
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const updateReimbursement = (reimbursementId: number, newStatus: string) => (dispatch: any) => {
  const currentUser = getCurrentUser();
  const resolved = new Date;
  if (currentUser && currentUser.role === "Manager") {
    fetch(`${environment.context}reimbursements/${reimbursementId}`, {
      body: JSON.stringify({ status: newStatus, resolver_id: currentUser.userId, resolved }),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'PATCH'
    })
      .then(resp => {
        if (resp.status === 200) {
          return resp.json();
        } else {
          throw new Error('Failed to update reimbursement');
        }
      }).then(resp => {
        dispatch({
          payload: {
            newStatus,
            reimbursementId: resp,
            resolved,
            resolver: currentUser
          },
          type: reimbursementTableTypes.UPDATE_REIMBURSEMENT
        })
      })
      .catch(err => {
        console.log(err);
      });
  }
}

export const filterReimbursements = (filteredReimbursements: Reimbursement[], statusFilter: string[]) => (dispatch: any) => {
  dispatch({
    payload: {
      filteredReimbursements,
      statusFilter
    },
    type: reimbursementTableTypes.FILTER_REIMBURSEMENTS
  })
}

export const updateActivePage = (activePage: number, filteredReimbursements: Reimbursement[], itemsCountPerPage: number) => (dispatch: any) => {
  const maxPage = Math.ceil(filteredReimbursements.length / itemsCountPerPage);
  if (activePage >= maxPage && maxPage > 0) {
    activePage = maxPage;
  }
  const startIndex = (activePage - 1) * itemsCountPerPage;
  const endIndex = startIndex + itemsCountPerPage;
  const renderedReimbursements = filteredReimbursements.slice(startIndex, endIndex);
  dispatch({
    payload: {
      activePage,
      renderedReimbursements
    },
    type: reimbursementTableTypes.UPDATE_ACTIVE_PAGE
  })
}

export const updateItemsCountPerPage = (itemsCountPerPage: number) => {
  return {
    payload: {
      itemsCountPerPage
    },
    type: reimbursementTableTypes.UPDATE_ITEMS_COUNT_PER_PAGE
  }
}

export const updateCustomItemsCountPerPage = (customItemsCountPerPage: number) => {
  return {
    payload: {
      customItemsCountPerPage
    },
    type: reimbursementTableTypes.UPDATE_CUSTOM_ITEMS_COUNT_PER_PAGE
  }
}

export const updateDetailsShown = (detailsShown: number[]) => {
  return {
    payload: {
      detailsShown
    },
    type: reimbursementTableTypes.UPDATE_DETAILS_SHOWN
  }
}

export const updateUsernameFilter = (usernameFilter: string) => {
  return {
    payload: {
      usernameFilter
    },
    type: reimbursementTableTypes.UPDATE_USERNAME_FILTER
  }
}
export const TABLE_SELECT_ROW = 'TABLE_SELECT_ROW';
export const TABLE_DELETE_ROW = 'TABLE_DELETE_ROW';
export const TABLE_CHANGE_PAGE = 'TABLE_CHANGE_PAGE';
export const TABLE_SET_FILTER = 'TABLE_SET_FILTER';

export function selectRow(rowId) {
  return {
    type: TABLE_SELECT_ROW,
    rowId 
  }
}

export function deleteRow(rowId) {
  return {
    type: TABLE_DELETE_ROW,
    rowId
  }
}

export function changePage(index) {
  return {
    type: TABLE_CHANGE_PAGE,
    activePage: index
  }
}

export function setFilter(filterValue) {
  return {
    type: TABLE_SET_FILTER,
    filterValue
  } 
}

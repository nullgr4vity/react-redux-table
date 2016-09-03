export const TABLE_SELECT_ROW = 'table_select_row';
export const TABLE_DELETE_ROW = 'table_delete_row';
export const TABLE_CHANGE_PAGE = 'TABLE_CHANGE_PAGE'

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
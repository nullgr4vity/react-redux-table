export const TABLE_SELECT_ROW = 'table_select_row';

export function selectRow(rowId) {
  return {
    type: TABLE_SELECT_ROW,
    rowId 
  }
}
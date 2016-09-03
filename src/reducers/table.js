import { TABLE_SELECT_ROW, TABLE_DELETE_ROW, TABLE_CHANGE_PAGE } from './../actions/table';

export default function table(state = {}, action) {
  switch (action.type) {
    case TABLE_SELECT_ROW: {
      return Object.assign({}, state, { selectedRowId: action.rowId });
    }

    case TABLE_DELETE_ROW: {

      let unselect = (state.selectedRowId === action.rowId) || state.selectedRowId < 0;
      let selectedRowIdAfterDelete = unselect ? UNSELECTED : state.selectedRowId;

      let records = [...state.data.slice(0, action.rowId), ...state.data.slice(action.rowId + 1)];
      return Object.assign({}, state, { data: records, selectedRowId: selectedRowIdAfterDelete });
    }

    case TABLE_CHANGE_PAGE: {
      return Object.assign({}, state, { activePage: action.activePage });
    }

    default: {
      return state;
    }
  }
}

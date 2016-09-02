import { TABLE_SELECT_ROW } from './../actions/table';

export default function table(state = {}, action) {
  switch (action.type) {
    case TABLE_SELECT_ROW: {
      return Object.assign({}, state, { selectedRowId: action.rowId });
    }

    default: {
      return state;
    }
  }
}

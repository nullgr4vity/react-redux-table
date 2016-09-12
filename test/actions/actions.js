import * as actions from '../../src/actions/table';

describe('actions', () => {
  it('should create an action to select row', () => {
    const expectedAction = {
      type: actions.TABLE_SELECT_ROW,
      rowId: 1
    }
    assert.deepEqual(actions.selectRow(1), expectedAction);
  })

  it('should create an action to delete row', () => {
    const expectedAction = {
      type: actions.TABLE_DELETE_ROW,
      rowId: 1
    }
    assert.deepEqual(actions.deleteRow(1), expectedAction);
  })

  it('should create an action to change page', () => {
    const expectedAction = {
      type: actions.TABLE_CHANGE_PAGE,
      activePage: 1
    }
    assert.deepEqual(actions.changePage(1), expectedAction);
  })

  it('should create an action to set filter', () => {
    const expectedAction = {
      type: actions.TABLE_SET_FILTER,
      filterValue: 'test'
    }
    assert.deepEqual(actions.setFilter('test'), expectedAction);
  })

  it('should create an action to set sort', () => {
    const expectedAction = {
      type: actions.TABLE_SET_SORT_DEF,
      sortColumnIndex: 1,
      sortDirection: -1
    }
    assert.deepEqual(actions.setSortDef(1, -1), expectedAction);
  })

})



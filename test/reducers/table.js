import reducer from '../../src/reducers/table';
import * as actions from '../../src/actions/table';
import TableHeaderItem from '../../src/components/TableHeaderItem';

describe('todos reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).to.deep.equal(
      {}
    )
  })

  it('should handle TABLE_SELECT_ROW', () => {
    expect(
      reducer({}, {
        type: actions.TABLE_SELECT_ROW,
        rowId: 1
      })
    ).to.deep.equal({
      selectedRowId: 1  
    })
  })

  it('should handle TABLE_DELETE_ROW', () => {
    let state = {data: [1,2,3,4,5,6,7].map( (index) => { return [index]; }) };

    let output = reducer(state, {
      type: actions.TABLE_DELETE_ROW,
      rowId: 1
    })

    expect(output.data.length).equal(state.data.length - 1);
    expect(output.data[1]).to.deep.equal([3]);
  })

  it('should handle TABLE_CHANGE_PAGE', () => {
    expect(
      reducer({}, {
        type: actions.TABLE_CHANGE_PAGE,
        activePage: 1
      })
    ).to.deep.equal({
      activePage: 1  
    })
  })

  it('should handle TABLE_SET_FILTER', () => {
    expect(
      reducer({}, {
        type: actions.TABLE_SET_FILTER,
        filterValue: 'new_test',
        activePage: 0
      })
    ).to.deep.equal({
      prevFilterValue: '',
      filterValue: 'new_test',
      activePage: 0
    })
  })

  it('should handle TABLE_SET_SORT_DEF', () => {
    expect(
      reducer({}, {
        type: actions.TABLE_SET_SORT_DEF,
        sortDirection: TableHeaderItem.SORT_ASCENDING,
        sortColumnIndex: 1
      })
    ).to.deep.equal({
      sortDirection: TableHeaderItem.SORT_ASCENDING,
      sortColumnIndex: 1
    })    
  })
});
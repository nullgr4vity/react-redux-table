import React from 'react';
import { connect } from 'react-redux';
import TableRow from './table/TableRow';
import Pagination from './Pagination';
import Button from './Button';
import FilterInput from './FilterInput';
import TableHeader from './table/TableHeader';

import { selectRow, deleteRow, changePage, setFilter, setSortDef } from './../actions/table';

const UNSELECTED = -1;

class Table extends React.Component {

  constructor(props) {
    super(props);

    this.onAddNewRow = this.onAddNewRow.bind(this);
    this.onDeleteRow = this.onDeleteRow.bind(this);
    this.onEditRow = this.onEditRow.bind(this);
    this.onSelectRow = this.onSelectRow.bind(this);
    this.onChangePageIndex = this.onChangePageIndex.bind(this);
    this.onHandleFilter = this.onHandleFilter.bind(this);
    this.onHandleSortColumn = this.onHandleSortColumn.bind(this);
  }

  onAddNewRow() {
    if (this.props.onAddRow) {
      this.props.onAddRow();
    }
  }

  onDeleteRow(rowId) {
    let { dispatch } = this.props;
    dispatch(deleteRow(rowId));

    if (this.props.onDeleteRow) {
      this.props.onDeleteRow(rowId);
    }
  }

  onEditRow(rowId) {
    if (this.props.onEditRow) {
      this.props.onEditRow(rowId);
    }
  }

  onSelectRow(rowId) {
    let selectedRowId = (this.props.selectedRowId === rowId) ? UNSELECTED : rowId;
    let { dispatch } = this.props;
    dispatch(selectRow(selectedRowId));

    if (this.props.onSelectRow && typeof this.props.onSelectRow === 'function') {
      this.props.onSelectRow(rowId);
    }
  }

  onChangePageIndex(index) {
    if (index < 0) {
      return;
    }

    let { dispatch } = this.props;
    dispatch(changePage(index));
  }

  onHandleFilter(value) {
    let { dispatch } = this.props;
    dispatch(setFilter(value));
  }

  onHandleSortColumn(columnIndex) {
    let sd = this.props.sortDirection;
    if (sd === TableHeader.SORT_NOPE) {
      sd = TableHeader.SORT_ASC;
    }

    let scdv = 1;
    if (this.props.sortColumnIndex === columnIndex) {
      scdv = TableHeader.SORT_CHANGE_DIRECTION;
    }

    let { dispatch } = this.props;
    dispatch(setSortDef(columnIndex, sd * scdv));
  }

  renderTBody() {
    let { pageSize, activePage, data, selectedRowId, tools } = this.props;
    data = data || [];
    let rows = [];

    for (let i = 0, cri = activePage * pageSize; cri < data.length && i < pageSize; i++, cri++) {
      let Row = (
        <TableRow
          data={data[cri]}
          key={`row-${cri}`}
          rowId={cri}
          selected={selectedRowId === cri}
          tools={tools}
          onDelete={this.onDeleteRow}
          onEdit={this.onEditRow}
          onSelect={this.onSelectRow}
        />);
      rows.push(Row);
    }

    return (<tbody>{rows}</tbody>);
  }

  renderTHead() {
    const { header, tools } = this.props;
    let sortData = {
      columnIndex: this.props.sortColumnIndex,
      sortDirection: this.props.sortDirection
    };

    return (<TableHeader
      cols={header}
      sort={sortData}
      onClick={this.onHandleSortColumn}
      isToolbox={tools}
    />);
  }

  renderSectionHeader() {
    return (
      <div className="section-header">
        <FilterInput onKeyUp={this.onHandleFilter} />
        <div style={{ float: 'right' }}>
          <Button cn={" btn-primary"} title={"Add new row"} onClick={this.onAddNewRow} />
        </div>
      </div>);
  }

  renderSectionBody() {
    return (
      <div className="section-body">
        <table className="table table-hover table-striped">
          {this.renderTHead()}
          {this.renderTBody()}
        </table>
      </div>);
  }

  renderSectionFooter(records, pageCount, pageSize) {
    return (
      <div className="section-footer">
        {(() => {
          if (records.length > pageSize) {
            return (
              <Pagination
                active={this.props.activePage}
                items={pageCount}
                onChange={this.onChangePageIndex}
              />);
          }
          return '';
        })()}
      </div>
    );
  }

  render() {
    let { pageSize, data } = this.props;
    data = data || [];
    let pageCount = Math.ceil(data.length / pageSize);

    return (
      <div>
        {this.renderSectionHeader()}
        {this.renderSectionBody()}
        {this.renderSectionFooter(data, pageCount, pageSize)}
      </div>);
  }
}

Table.defaultProps = {
  activePage: 0,
  pageSize: 10,
  tools: true,
  sortColumnIndex: UNSELECTED,
  sortDirection: TableHeader.SORT_NOPE,
  selectedRowId: UNSELECTED,
  minFilterSize: 3
};

Table.propTypes = {
  activePage: React.PropTypes.number,
  data: React.PropTypes.array.isRequired,
  header: React.PropTypes.arrayOf(React.PropTypes.string),
  tools: React.PropTypes.bool,
  sortDirection: React.PropTypes.number,
  selectedRowId: React.PropTypes.number,
  minFilterSize: React.PropTypes.number,

  onDeleteRow: React.PropTypes.func,
  onAddRow: React.PropTypes.func,
  onEditRow: React.PropTypes.func,
  onSelectRow: React.PropTypes.func
};

function filterRecords(data, filterValue) {
  let records = data;

  if (filterValue !== '') {
    records = data.filter((row) => {
      let value = row.join();
      if (value.indexOf(filterValue) >= 0) {
        return value;
      }

      return false;
    });
  }

  return records;
}

function sortRecords(data, sortColumnIndex, sortDirection) {
  let records = data;
  records.sort((a, b) => {
    let v1 = a[sortColumnIndex];
    let v2 = b[sortColumnIndex];
    return sortDirection * v1.localeCompare(v2);
  });

  return records;
}

function shouldSort(state) {
  return (state.table.sortColumnIndex !== undefined);
}

function shouldFilter(state, ownProps) {
  let filterValue = state.table.filterValue || '';
  let prevFilterValue = state.table.prevFilterValue || '';
  let minFilterSize = ownProps.minFilterSize ?
    ownProps.minFilterSize : Table.defaultProps.minFilterSize;

  return (filterValue.length >= minFilterSize && filterValue !== prevFilterValue);
}

function mapStateToProps(state, ownProps) {
  let records = state.table.data;
  if (shouldFilter(state, ownProps)) {
    records = filterRecords(state.table.data, state.table.filterValue);
  }

  if (shouldSort(state)) {
    records = sortRecords(records, state.table.sortColumnIndex, state.table.sortDirection);
  }

  return {
    selectedRowId: state.table.selectedRowId,
    data: records,
    header: state.table.header,
    activePage: state.table.activePage,
    sortDirection: state.table.sortDirection || TableHeader.SORT_NOPE,
    sortColumnIndex: state.table.sortColumnIndex === undefined ?
      UNSELECTED : state.table.sortColumnIndex
  };
}

export default connect(mapStateToProps)(Table);

import React from 'react';
import { connect } from 'react-redux';
import TableRow from './TableRow';
import Pagination from './Pagination';
import Button from './Button';
import FilterInput from './FilterInput';
import TableHeaderItem from './TableHeaderItem';

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
    if (this.props.tools) {
      columnIndex -= 1;
    }

    let sd = this.props.sortDirection;
    if (sd === TableHeaderItem.SORT_NOPE) {
      sd = TableHeaderItem.SORT_ASCENDING;
    }

    let scdv = 1;
    if (this.props.sortColumnIndex === columnIndex) {
      scdv = TableHeaderItem.SORT_CHANGE_DIRECTION;
    }

    let { dispatch } = this.props;
    dispatch(setSortDef(columnIndex, sd * scdv));
  }

  prepRows(records, cp, ps) {
    let rows = [];

    for (let i = 0, cri = cp * ps; cri < records.length && i < ps; i++, cri++) {
      let Row = (
        <TableRow
          data={records[cri]}
          key={`row-${cri}`}
          rowId={cri}
          selected={this.props.selectedRowId === cri}
          tools={this.props.tools}
          onDelete={this.onDeleteRow}
          onEdit={this.onEditRow}
          onSelect={this.onSelectRow}
        />);
      rows.push(Row);
    }

    return rows;
  }

  prepHeader(header, tools) {
    let output = [];

    if (!header) return null;

    if (tools && header.length > 0) {
      let th = (<TableHeaderItem key={output.length} colId={output.length} />);
      output.push(th);
    }

    for (let i = 0; i < header.length; i++) {
      let sorted = TableHeaderItem.SORT_NOPE;
      if (i === this.props.sortColumnIndex) {
        sorted = this.props.sortDirection;
      }

      let th = (
        <TableHeaderItem
          sorted={sorted}
          key={output.length}
          colId={output.length}
          title={header[i]}
          onClick={this.onHandleSortColumn}
        />);
      output.push(th);
    }

    return (<tr>{output}</tr>);
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

  renderSectionBody(header, rows) {
    return (
      <div className="section-body">
        <table className="table table-hover table-striped">
          <thead>
            {header}
          </thead>
          <tbody>
            {rows}
          </tbody>
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
    let pageSize = this.props.pageSize;
    let ap = this.props.activePage;

    let pageCount = Math.ceil(this.props.data.length / pageSize);

    let header = this.prepHeader(this.props.header, this.props.tools);
    let rows = this.prepRows(this.props.data, ap, pageSize);

    return (
      <div>
        {this.renderSectionHeader()}
        {this.renderSectionBody(header, rows)}
        {this.renderSectionFooter(this.props.data, pageCount, pageSize)}
      </div>);
  }
}

Table.defaultProps = {
  activePage: 0,
  pageSize: 10,
  tools: true,
  sortColumnIndex: UNSELECTED,
  sortDirection: TableHeaderItem.SORT_NOPE,
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
    sortDirection: state.table.sortDirection || TableHeaderItem.SORT_NOPE,
    sortColumnIndex: state.table.sortColumnIndex === undefined ?
      UNSELECTED : state.table.sortColumnIndex
  };
}

export default connect(mapStateToProps)(Table);

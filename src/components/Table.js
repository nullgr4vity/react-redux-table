import React from 'react';
import { connect } from 'react-redux';
import TableRow from './TableRow';
import Pagination from './Pagination';
import Button from './Button';
import FilterInput from './FilterInput';
import TableHeaderItem from './TableHeaderItem';

import { selectRow, deleteRow } from './../actions/table';

const UNSELECTED = -1;

class Table extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: this.props.data,
      currentPage: this.props.page,
      filterValue: this.props.filterValue,
      selectedRowId: UNSELECTED,
      sortDirection: this.props.sortDirection,
      sortColumn: this.props.sortColumn
    };

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

    if (this.props.onSelectRow && typeof(this.props.onSelectRow) === 'function') {
      this.props.onSelectRow(rowId);
    }
  }

  onChangePageIndex(index) {
    if (index < 0) {
      return;
    }

    this.setState({
      currentPage: index
    });
  }

  onHandleFilter(value) {
    this.setState({
      filterValue: value,
      currentPage: 0
    });
  }

  onHandleSortColumn(colId) {
    if (this.props.tools) {
      colId -= 1;
    }

    let sd = this.state.sortDirection;
    if (sd === TableHeaderItem.SORT_NOPE) {
      sd = TableHeaderItem.SORT_ASCENDING;
    }

    let scdv = 1;
    if (this.state.sortColumn === colId) {
      scdv = TableHeaderItem.SORT_CHANGE_DIRECTION;
    }

    function sortFunction(a, b) {
      return sd * a[colId].localeCompare(b[colId]);
    }

    let records = this.props.data;
    records.sort(sortFunction);

    this.setState({
      data: records,
      sortColumn: colId,
      sortDirection: (sd * scdv)
    });
  }

  filterRecords(data) {
    let records = data;

    if (this.state.filterValue !== '') {
      records = data.filter((row) => {
        let value = row.join();
        if (value.indexOf(this.state.filterValue) >= 0) {
          return value;
        }

        return false;
      });
    }

    return records;
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

    if (tools && header.length > 0) {
      let th = (<TableHeaderItem key={output.length} colId={output.length} />);
      output.push(th);
    }

    for (let i = 0; i < header.length; i++) {
      let sorted = TableHeaderItem.SORT_NOPE;
      if (i === this.state.sortColumn) {
        sorted = this.state.sortDirection;
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

    return output;
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
            <tr>
              {header}
            </tr>
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
                current={this.state.currentPage}
                pageCount={pageCount}
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
    let cp = this.state.currentPage;

    let records = this.filterRecords(this.props.data);
    let pageCount = Math.ceil(records.length / pageSize);

    let header = this.prepHeader(this.props.header, this.props.tools);
    let rows = this.prepRows(records, cp, pageSize);

    return (
      <div>
        {this.renderSectionHeader()}
        {this.renderSectionBody(header, rows)}
        {this.renderSectionFooter(records, pageCount, pageSize)}
      </div>);
  }
}

Table.defaultProps = {
  page: 0,
  pageSize: 10,
  tools: true,
  sortColumn: 0,
  sortDirection: TableHeaderItem.SORT_NOPE,
  filterValue: '',
  selectedRowId: UNSELECTED
};

Table.propTypes = {
  page: React.PropTypes.number,
  data: React.PropTypes.array.isRequired,
  header: React.PropTypes.arrayOf(React.PropTypes.string),
  tools: React.PropTypes.bool,
  sortDirection: React.PropTypes.number,
  filterValue: React.PropTypes.string,
  selectedRowId: React.PropTypes.number,

  onDeleteRow: React.PropTypes.func,
  onAddRow: React.PropTypes.func,
  onEditRow: React.PropTypes.func,
  onSelectRow: React.PropTypes.func
};

function mapStateToProp(state) {
  return {
    selectedRowId: state.table.selectedRowId,
    data: state.table.data,
    header: state.table.header
  }
}

export default connect(mapStateToProp)(Table);

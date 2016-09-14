import React from 'react';
import TableCell from './TableCell';
import ToolBox from './ToolBox';

class TableRow extends React.Component {
  constructor(props) {
    super(props);

    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  onDelete() {
    if (!this.props.onDelete) {
      return;
    }

    this.props.onDelete(this.props.rowId);
  }

  onEdit() {
    if (!this.props.onEdit) {
      return;
    }

    this.props.onEdit(this.props.rowId);
  }

  onSelect() {
    if (!this.props.onSelect) {
      return;
    }

    this.props.onSelect(this.props.rowId);
  }

  renderCells(rowId, data) {
    let cells = data.map((value, colId) =>
      <TableCell value={value} key={`cell-${rowId}-${colId}`} />
    );

    return cells;
  }

  renderToolBox(rowId, active) {
    if (!active) return null;
    return <ToolBox rowId={rowId} onEdit={this.onEdit} onDelete={this.onDelete} />;
  }

  render() {
    const { data, tools, rowId, selected } = this.props;

    let rowSelectedClass = selected ? ' success' : '';
    return (
      <tr onClick={this.onSelect} className={rowSelectedClass}>
        {this.renderToolBox(rowId, tools)}
        {this.renderCells(rowId, data)}
      </tr>
    );
  }
}

TableRow.propTypes = {
  rowId: React.PropTypes.number.isRequired,
  data: React.PropTypes.array.isRequired,
  tools: React.PropTypes.bool,
  selected: React.PropTypes.bool,

  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func,
  onSelect: React.PropTypes.func
};

TableRow.defaultProps = {
  tools: false,
  selected: false
};

export default TableRow;

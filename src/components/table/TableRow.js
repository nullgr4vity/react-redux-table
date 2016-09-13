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

  render() {
    let that = this;
    let cell = this.props.data.map((value, colId) =>
      <TableCell value={value} key={`cell-${that.props.rowId}-${colId}`} />
    );

    let tools = null;
    if (this.props.tools) {
      tools = (
        <ToolBox rowId={this.props.rowId} onEdit={this.onEdit} onDelete={this.onDelete} />
      );
    }

    let rowSelectedClass = this.props.selected ? ' success' : '';
    return (
      <tr onClick={this.onSelect} className={rowSelectedClass}>
        {tools}
        {cell}
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

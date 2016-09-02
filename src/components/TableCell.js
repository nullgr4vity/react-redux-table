import React from 'react';

class TableCell extends React.Component {
  render() {
    if (!this.props.value) {
      return null;
    }

    return (
      <td>{this.props.value}</td>
    );
  }
}

TableCell.propTypes = {
  value: React.PropTypes.string
};

export default TableCell;

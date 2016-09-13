import React from 'react';

class TableCell extends React.PureComponent {
  render() {
    if (!this.props.value) {
      return (<td />);
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

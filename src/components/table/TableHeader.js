import React from 'react';

class TableHeader extends React.Component {

  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /*
   * prepare html fragment with toolbox in case this.props.isToolbox === true
   */
  thToolboxContent() {
    return (
      <th key="-1" style={{ textAlign: 'center' }}>
        <span className="glyphicon glyphicon-cog" />
      </th>
    );
  }

  /*
   * prepare html fragment with indicators which explains sort directions to the user
   * for current (index) column
   */
  thSortIndicatorsContent(index) {
    let { sort } = this.props;

    const sd = (index !== sort.columnIndex) ? TableHeader.SORT_NOPE : sort.sortDirection;
    const [top, bottom] = (sd === TableHeader.SORT_ASC) ? ['#000', '#aaa'] : ['#aaa', '#000'];
    const isVisible = (sd === TableHeader.SORT_NOPE) ? 'none' : 'block';

    return (
      <div style={{ fontSize: '10px', width: '10px', float: 'right' }}>
        <span
          className="glyphicon glyphicon-triangle-top"
          style={{ display: isVisible, color: top }}
        />
        <span
          className="glyphicon glyphicon-triangle-bottom"
          style={{ display: isVisible, color: bottom }}
        />
      </div>
    );
  }

  /*
   * send information about clicked header's column to parent component
   * column index is in data-id attribute
   * toolbox doesn't have data-id so it's undefined. so clicking on tooblox doesn't call parent.
   */
  onClick(event) {
    if (!this.props.onClick) {
      return;
    }

    const value = event.currentTarget.dataset.id;
    if (!isNaN(value)) { // toolbox column has data-id undefined
      this.props.onClick(parseInt(value, 10));
    }
  }

  /*
   * main html th fragment builder
   * value contain label
   * index contain index on this.props.cols list
   */
  thContent(value, index) {
    const indicators = this.thSortIndicatorsContent(index);

    return (
      <th onClick={this.onClick} data-id={index} key={index}>
        <span>{value}</span>
        {indicators}
      </th>
    );
  }

  render() {
    const { cols, isToolbox } = this.props;
    if (cols === undefined) return null;

    // prepare table header's columns from labels
    let ths = cols.map((value, index) => this.thContent(value, index));

    // when toolbox visible then add it as a first column
    if (isToolbox) {
      let toolbox = this.thToolboxContent();
      ths.unshift(toolbox);
    }

    return (
      <thead>
        <tr>
          {ths}
        </tr>
      </thead>
    );
  }
}

TableHeader.SORT_ASC = 1;
TableHeader.SORT_NOPE = 0;
TableHeader.SORT_DESC = -1;
TableHeader.SORT_CHANGE_DIRECTION = -1;

TableHeader.propTypes = {
  cols: React.PropTypes.arrayOf(React.PropTypes.string),
  sort: React.PropTypes.shape({
    columnIndex: React.PropTypes.number,
    sortDirection: React.PropTypes.number
  }),
  isToolbox: React.PropTypes.bool,
  onClick: React.PropTypes.func
};

TableHeader.defaultProps = {
  cols: undefined,
  sort: { columnIndex: -1, sortDirection: TableHeader.SORT_NOPE },
  isToolbox: true,
  onClick: undefined
};

export default TableHeader;

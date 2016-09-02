import React from 'react';

class TableHeaderItem extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (!this.props.onClick) {
      return;
    }

    let colId = this.props.colId;
    this.props.onClick(colId);
  }

  createSortToolbox(sorted) {
    let visible = (sorted === TableHeaderItem.SORT_NOPE) ? 'none' : 'block';

    let [topColor, bottomColor] = ['lightgrey', 'black'];
    if (sorted === TableHeaderItem.SORT_ASCENDING) {
      [topColor, bottomColor] = ['black', 'lightgrey'];
    }

    return (
      <div style={{ fontSize: '10px', width: '10px', float: 'right' }}>
        <span
          className="glyphicon glyphicon-triangle-top"
          style={{ display: visible, color: topColor }}
        />
        <span
          className="glyphicon glyphicon-triangle-bottom"
          style={{ display: visible, color: bottomColor }}
        />
      </div>);
  }

  render() {
    let style = {};
    let content = this.props.title;
    if (!this.props.title) {
      style = { textAlign: 'center' };
      content = <span className="glyphicon glyphicon-cog" />;
    }

    let sortToolbox = this.createSortToolbox(this.props.sorted);

    return (
      <th onClick={this.onClick} style={style}>
        {content}
        {sortToolbox}
      </th>);
  }

}

TableHeaderItem.SORT_ASCENDING = 1;
TableHeaderItem.SORT_NOPE = 0;
TableHeaderItem.SORT_DESCENDING = -1;
TableHeaderItem.SORT_CHANGE_DIRECTION = -1;

TableHeaderItem.propTypes = {
  title: React.PropTypes.string,
  sorted: React.PropTypes.number,
  onClick: React.PropTypes.func
};

TableHeaderItem.defaultProps = {
  sorted: TableHeaderItem.SORT_NOPE
};

export default TableHeaderItem;

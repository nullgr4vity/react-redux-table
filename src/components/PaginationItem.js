import React from 'react';

class PaginationItem extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    if (this.props.status !== PaginationItem.PLACEBO) {
      return;
    }

    this.props.onClick(this.props.pid);
  }

  renderPrev() {
    let cn = this.props.status;

    return (
      <li className={cn} onClick={this.onClick}>
        <a>&laquo;</a>
      </li>);
  }

  renderNext() {
    let cn = this.props.status;

    return (
      <li className={cn} onClick={this.onClick}>
        <a>&raquo;</a>
      </li>);
  }

  renderItem() {
    let cn = this.props.status;

    return (
      <li className={cn} onClick={this.onClick}>
        <a>{this.props.value}</a>
      </li>);
  }

  render() {
    switch (this.props.type) {
      case PaginationItem.PREV:
        return this.renderPrev();
      case PaginationItem.NEXT:
        return this.renderNext();
      case PaginationItem.ITEM:
      default:
        return this.renderItem();
    }
  }

}

PaginationItem.PREV = -1;
PaginationItem.ITEM = 0;
PaginationItem.NEXT = 1;

PaginationItem.DISABLED = 'disabled';
PaginationItem.ACTIVE = 'active';
PaginationItem.PLACEBO = '';

PaginationItem.propTypes = {
  type: React.PropTypes.number,
  value: React.PropTypes.number,
  status: React.PropTypes.string,
  onClick: React.PropTypes.func
};

PaginationItem.defaultProps = {
  type: PaginationItem.ITEM,
  status: PaginationItem.PLACEBO,
  onClick: () => {}
};

export default PaginationItem;

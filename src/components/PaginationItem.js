import React from 'react';

class PaginationItem extends React.Component {

  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  empty() {
    return;
  }

  onClick() {
    if (!this.props.onClick) {
      return;
    }

    this.props.onClick(this.props.pid);
  }

  renderPrev() {
    let f = (this.props.status === PaginationItem.PLACEBO) ? this.onClick : () => {};
    let cn = this.props.status;

    return (
      <li className={cn} onClick={f}>
        <a>&laquo;</a>
      </li>);
  }

  renderNext() {
    let f = (this.props.status === PaginationItem.PLACEBO) ? this.onClick : () => {};
    let cn = this.props.status;

    return (
      <li className={cn} onClick={f}>
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
  value: React.PropTypes.string,
  status: React.PropTypes.string,
  onClick: React.PropTypes.func
};

PaginationItem.defaultProps = {
  type: PaginationItem.ITEM,
  status: PaginationItem.PLACEBO,
  value: ''
};

export default PaginationItem;

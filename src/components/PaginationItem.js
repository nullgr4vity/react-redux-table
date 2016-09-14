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

  render() {
    const { value, status } = this.props;

    return (
      <li className={status} onClick={this.onClick}>
        <a>{value}</a>
      </li>
    );
  }
}

PaginationItem.PREV_LABEL = '\u00ab';
PaginationItem.NEXT_LABEL = '\u00bb';

PaginationItem.DISABLED = 'disabled';
PaginationItem.ACTIVE = 'active';
PaginationItem.PLACEBO = '';

PaginationItem.propTypes = {
  value: React.PropTypes.string,
  status: React.PropTypes.string,
  onClick: React.PropTypes.func
};

PaginationItem.defaultProps = {
  type: PaginationItem.ITEM,
  status: PaginationItem.PLACEBO,
  onClick: () => {}
};

export default PaginationItem;

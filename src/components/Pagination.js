import React from 'react';
import PaginationItem from './PaginationItem';

class Pagination extends React.Component {

  constructor(props) {
    super(props);

    this.handleClickNext = this.handleClickNext.bind(this);
    this.handleClickPrev = this.handleClickPrev.bind(this);
    this.handleClickFirst = this.handleClickFirst.bind(this);
    this.handleClickLast = this.handleClickLast.bind(this);
    this.handleClickPage = this.handleClickPage.bind(this);
  }

  handleClickNext() {
    this.props.onChange(this.props.active + 1);
  }

  handleClickPrev() {
    this.props.onChange(this.props.active - 1);
  }

  handleClickFirst() {
    this.props.onChange(0);
  }

  handleClickLast() {
    this.props.onChange(this.props.items);
  }

  handleClickPage(pid) {
    if (!this.props.onChange) {
      return;
    }

    this.props.onChange(pid);
  }

  renderPrevButton() {
    let prev = '';
    if (this.props.items > this.props.size) {
      let disabled = (this.props.active === 0) ? PaginationItem.DISABLED : PaginationItem.PLACEBO;
      prev = (
        <PaginationItem
          value={PaginationItem.PREV_LABEL}
          status={disabled}
          onClick={this.handleClickPrev}
        />);
    }
    return prev;
  }

  // calulate offset so active button will be in the middle
  // if more items then max size of page's bar
  calculateOffset() {
    const { active, size, items } = this.props;
    let offset = 0;
    if (active > Math.floor(size / 2)) {
      if (active > items - Math.ceil(size / 2)) {
        offset = items - size;
      } else {
        offset = active - Math.floor(size / 2);
      }
    }
    return offset;
  }

  renderIndexButtons() {
    let pages = [];
    let offset = this.calculateOffset();
    const { size, items, active } = this.props;

    let range = items < size ? items : size;
    for (let i = offset; i < offset + range; i++) {
      let isActive = (i === this.props.active) ? PaginationItem.ACTIVE : PaginationItem.PLACEBO;

      let el = (
        <PaginationItem
          status={isActive}
          value={`${i + 1}`}
          key={i}
          pid={i}
          onClick={this.handleClickPage}
        />);
      pages.push(el);
    }

    return pages;
  }

  renderNextButton() {
    let next = '';
    if (this.props.items > this.props.size) {
      let outOfSpace = (this.props.active + 1) === this.props.items;
      let disabled = outOfSpace ? PaginationItem.DISABLED : PaginationItem.PLACEBO;
      next = (
        <PaginationItem
          value={PaginationItem.NEXT_LABEL}
          status={disabled}
          onClick={this.handleClickNext}
        />);
    }

    return next;
  }

  render() {
    return (
      <nav aria-label="Page navigation" style={{ float: 'right' }}>
        <ul className="pagination">
          {this.renderPrevButton()}
          {this.renderIndexButtons()}
          {this.renderNextButton()}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  size: React.PropTypes.number,
  items: React.PropTypes.number.isRequired,
  active: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func
};

Pagination.defaultProps = {
  size: 5
};

export default Pagination;

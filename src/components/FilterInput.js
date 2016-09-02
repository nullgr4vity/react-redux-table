import React from 'react';

class FilterInput extends React.Component {

  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(event) {
    if (!this.props.onKeyUp) {
      return;
    }

    let value = event.currentTarget.value;
    if (value.length > this.props.minLengthToPropagate) {
      this.props.onKeyUp(value);
    }
  }

  render() {
    return (
      <input type="text" onKeyUp={this.onKeyUp} />
    );
  }

}

FilterInput.propTypes = {
  minLengthToPropagate: React.PropTypes.number,
  maxLength: React.PropTypes.number,
  onKeyUp: React.PropTypes.func
};

FilterInput.defaultProps = {
  maxLength: 50,
  minLengthToPropagate: 3
};

export default FilterInput;

import React from 'react';

class FilterInput extends React.Component {

  constructor(props) {
    super(props);
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  onKeyUp(event) {
    let value = event.currentTarget.value;
    if (this.props.onKeyUp) {
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
  maxLength: React.PropTypes.number,
  onKeyUp: React.PropTypes.func
};

FilterInput.defaultProps = {
  maxLength: 50
};

export default FilterInput;

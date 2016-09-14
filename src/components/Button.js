import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  /*
   * used mediated onClick method to stop propagate event on this level
   */
  onClick(event) {
    event.stopPropagation();

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  renderLabel(label) {
    return label ? <span>{label}</span> : null;
  }

  renderIcon(icon) {
    return icon ? <span className={`glyphicon glyphicon-${icon}`} aria-hidden="true" /> : null;
  }

  render() {
    const { label, className, icon, rowId, ...props } = this.props;

    return (
      <button
        type="button"
        {...props}
        className={`btn ${className}`}
        onClick={this.onClick}
      >
        {this.renderLabel(label)}
        {this.renderIcon(icon)}
      </button>
    );
  }
}

Button.DEFAULT = 'btn-default';
Button.EDIT = 'pencil';
Button.TRASH = 'trash';

Button.propTypes = {
  className: React.PropTypes.string,
  label: React.PropTypes.string,
  onClick: React.PropTypes.func
};

Button.defaultProps = {
  className: Button.DEFAULT,
  label: ''
};

export default Button;

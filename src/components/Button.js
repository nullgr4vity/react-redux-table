import React from 'react';

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.stopPropagation();

    if (this.props.onClick) {
      this.props.onClick();
    }
  }

  render() {
    let value = '';
    let { cn, title, type, style } = this.props;

    if (title) {
      value = title;
    }

    if (type === Button.EDIT) {
      value = <span className="glyphicon glyphicon-pencil" aria-hidden="true" />;
    }

    if (type === Button.TRASH) {
      value = <span className="glyphicon glyphicon-trash" aria-hidden="true" />;
      cn = ' btn-danger';
    }

    return (
      <a className={`btn ${cn}`} onClick={this.onClick} style={style}>{value}</a>
    );
  }
}

Button.propTypes = {
  cn: React.PropTypes.string,
  title: React.PropTypes.string,
  type: React.PropTypes.number,
  onClick: React.PropTypes.func
};

Button.defaultProps = {
  title: '',
  cn: ' btn-default'
};

Button.EDIT = 0;
Button.TRASH = 1;

export default Button;

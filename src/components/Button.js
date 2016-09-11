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
    let { title, type, style } = this.props;
    let def = { default: { cn: ' btn-primary' },
      edit: { icon: 'pencil', cn: ' btn-default' },
      trash: { icon: 'trash', cn: ' btn-danger' }
    };

    let content = title;
    if (type !== Button.DEFAULT) {
      content = <span className={`glyphicon glyphicon-${def[type].icon}`} aria-hidden="true" />;
    }

    return (
      <a className={`btn ${def[type].cn}`} onClick={this.onClick} style={style}>{content}</a>
    );
  }
}

export const BUTTON_WARNING_LABEL_MISSING = 'add label !!!!';

Button.DEFAULT = 'default';
Button.EDIT = 'edit';
Button.TRASH = 'trash';

Button.propTypes = {
  cn: React.PropTypes.string,
  title: React.PropTypes.string,
  type: React.PropTypes.string,
  onClick: React.PropTypes.func
};

Button.defaultProps = {
  title: BUTTON_WARNING_LABEL_MISSING,
  type: Button.DEFAULT,
  cn: ' btn-default'
};

export default Button;

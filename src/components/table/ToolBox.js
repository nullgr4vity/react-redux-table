import React from 'react';
import Button from './../Button';

class ToolBox extends React.Component {

  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  onDelete() {
    if (!this.props.onDelete) {
      return;
    }

    this.props.onDelete(this.props.rowId);
  }

  onEdit() {
    if (!this.props.onEdit) {
      return;
    }

    this.props.onEdit(this.props.rowId);
  }

  render() {
    return (
      <td style={{ textAlign: 'center' }}>
        <Button
          icon={Button.EDIT}
          rowId={this.props.rowId}
          onClick={this.onEdit}
          style={{ marginRight: '2px' }}
        />

        <Button
          icon={Button.TRASH}
          rowId={this.props.rowId}
          onClick={this.onDelete}
          className={'btn-danger'}
        />
      </td>
    );
  }
}

ToolBox.propTypes = {
  rowId: React.PropTypes.number.isRequired,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func
};

export default ToolBox;

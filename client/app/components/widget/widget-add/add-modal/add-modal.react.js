/**
 * Widget Add Modal Component
 */

var React = require('react');
var Modal = require('../../../ui/modal/modal.react');
var UiStore = require('../../../../stores/ui-store');
var Constants = require('../../../../constants/app-constants');
var WidgetAddForm = require('../add-form/add-form.react');

function _getInitialState() {
  return {
    visible: (UiStore.getModalVisible() === Constants.ModalTypes.ADD_WIDGET)
  }
}

var WidgetAddModal = React.createClass({

  getInitialState: function() {
    return _getInitialState();
  },

  componentDidMount: function() {
    UiStore.addChangeListener(this._onStatusUpdate);
  },

  componentDidUnmount: function() {
    UiStore.removeChangeListener(this._onStatusUpdate);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Modal
        title="Add new widget"
        size="large"
        hasClose={ true }
        isVisible={ this.state.visible }>
        <WidgetAddForm />
      </Modal>
    );
  },

  _onStatusUpdate: function() {
    this.setState(_getInitialState());
  }
});

module.exports = WidgetAddModal;
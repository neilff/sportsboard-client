/**
 * Widget Add Modal Component
 */

var React = require('react');
var Modal = require('../../ui/modal/modal.react');
var UiStore = require('../../../stores/ui-store');
var Constants = require('../../../constants/app-constants');

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
      <Modal title="Add new widget" hasClose={ true } isVisible={ this.state.visible }>
        <h1>TODO: Add widget modal</h1>
      </Modal>
    );
  },

  _onStatusUpdate: function() {
    this.setState(_getInitialState());
  }
});

module.exports = WidgetAddModal;
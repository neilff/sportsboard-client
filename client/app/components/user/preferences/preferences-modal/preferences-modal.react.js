/**
 * Preferneces Modal Component
 */

var React = require('react');
var PreferencesForm = require('../preferences-form/preferences-form.react');
var Modal = require('../../../ui/modal/modal.react');
var UiStore = require('../../../../stores/ui-store');
var Constants = require('../../../../constants/app-constants');

function _getInitialState() {
  return {
    visible: (UiStore.getModalVisible() === Constants.ModalTypes.PREFERENCES)
  }
}

var PreferencesModal = React.createClass({

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
    var visbility = this.state.visible;

    return (
      <Modal title="User Preferences" isVisible={ visbility } hasClose={ true }>
        <PreferencesForm />
      </Modal>
    );
  },

  _onStatusUpdate: function() {
    this.setState(_getInitialState())
  }
});

module.exports = PreferencesModal;
/**
 * SubHeader Component
 */

var React = require('react');
var Button = require('../ui/forms/button/button.react');
var UiActions = require('../../actions/ui-actions');
var Constants = require('../../constants/app-constants');

var SubHeader = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="subheader">
          <Button
            className="btn btn--small btn--blue"
            onClick={ this._showWidgetAddModal }>
            <i className="icon ion-plus-round"></i> Add Widget
          </Button>
      </div>
    );
  },

  _showWidgetAddModal: function() {
    UiActions.showModal(Constants.ModalTypes.ADD_WIDGET)
  }
});

module.exports = SubHeader;
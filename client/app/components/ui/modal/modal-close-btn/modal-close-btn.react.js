/**
 * Modal Close Button Component
 */

var React = require('react');
var UiActions = require('../../../../actions/ui-actions');
var Button = require('../../forms/button/button.react');

var ModalCloseBtn = React.createClass({

  handleClick: function() {
    UiActions.showModal(null);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Button
        className="btn btn--black btn--close"
        onClick={ this.handleClick }>
          <i className="icon ion-ios7-close-empty"></i>
      </Button>
    );
  }
});

module.exports = ModalCloseBtn;
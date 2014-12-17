/**
 * Header Close Button Component
 */

var React = require('react');
var UiActions = require('../../../actions/ui-actions');
var Button = require('../../ui/forms/button/button.react');

var ModalCloseBtn = React.createClass({

  handleClick: function() {
    UiActions.toggleHeader();
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Button
        className="btn btn--close-header"
        onClick={ this.handleClick }>
          <i className="icon ion-chevron-up"></i>
      </Button>
    );
  }
});

module.exports = ModalCloseBtn;
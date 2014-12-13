/**
 * Logout Button Component
 */

var React = require('react');
var LoginActions = require('../../../actions/login-actions');

var LogoutButton = React.createClass({

  handleClick: function() {
    LoginActions.setCredentials(null);
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <button
        className="btn btn-default btn-login"
        onClick={ this.handleClick }>
          <i className="icon ion-log-out"></i> Sign Out
      </button>
    );
  }
});

module.exports = LogoutButton;
/**
 * Facebook Login Button Component
 */

var React = require('react');
var LoginActions = require('../../../../actions/login-actions');
var UrlUtils = require('../../../../utils/url-utils');
var Button = require('../../../ui/forms/button/button.react');

var LogoutButton = React.createClass({

  handleClick: function() {
    UrlUtils.gotoFacebookLogin();
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Button
        className="btn btn--blue"
        onClick={ this.handleClick }>
          <i className="icon ion-social-facebook"></i> Facebook
      </Button>
    );
  }
});

module.exports = LogoutButton;
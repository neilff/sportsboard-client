/**
 * Login Modal Component
 */

var React = require('react');
var LoginFacebookBtn = require('../login-facebook-btn/login-facebook-btn.react');
var Modal = require('../../ui/modal/modal.react');

var LoginModal = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Modal title="Sign in to Sportsboard">
        <LoginFacebookBtn />
      </Modal>
    );
  }
});

module.exports = LoginModal;
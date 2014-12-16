/**
 * Login Component
 */

var React = require('react');
var RegisterForm = require('../register-form/register-form.react');
var Modal = require('../../ui/modal/modal.react');

var RegisterOverlay = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Modal title="Register for Sportsboard">
        <RegisterForm />
      </Modal>
    );
  }
});

module.exports = RegisterOverlay;
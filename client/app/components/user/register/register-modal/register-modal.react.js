/**
 * Register Modal Component
 */

var React = require('react');
var RegisterForm = require('../register-form/register-form.react');
var Modal = require('../../../ui/modal/modal.react');

var RegisterModal = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Modal title="Register for Sportsboard" isVisible={ true }>
        <RegisterForm />
      </Modal>
    );
  }
});

module.exports = RegisterModal;
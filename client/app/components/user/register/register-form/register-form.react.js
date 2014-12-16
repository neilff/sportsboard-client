/**
 * RegisterForm Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;
var UserActions = require('../../../actions/user-actions');

var Form = require('../../ui/forms/form/form.react');
var Button = require('../../ui/forms/button/button.react');
var Label = require('../../ui/forms/label/label.react');
var Input = require('../../ui/forms/input/input.react');

var RegisterForm = React.createClass({

  getInitialState: function() {
    return {
      hasErrors: false,
      username: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var hasErrors = this.state.hasErrors;
    var usernameInvalid = this.state.username;

    var errMsgClass = cx({
      'form--group': true,
      'form--error': true,
      'visible': this.state.hasErrors,
      'hidden': !this.state.hasErrors
    });

    return (
      <Form onSubmit={ this._handleSubmit }>
        <div className="form--group">
          <Label htmlFor="username">Username</Label>
          <Input placeholder="John Smith" ref="username" label="Username:" isInvalid={ usernameInvalid } />
        </div>

        <div className={ errMsgClass }>
          <p className="lead text--center">There is an error with the form. Please check your inputs.</p>
        </div>

        <div className="form--group text--center">
          <Button className="btn btn--blue"><i className="icon ion-checkmark"></i> Register</Button>
        </div>
      </Form>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();

    var user = {
      username: this.refs.username.getDOMNode().value
    };

    var errors = this.getInitialState();

    if (!user.username) {
      errors['hasErrors'] = true;
      errors['username'] = true;
    }

    this.setState(errors);

    if (errors['hasErrors']) {
      return;
    }

    UserActions.registerUser(user);
  }
});

module.exports = RegisterForm;
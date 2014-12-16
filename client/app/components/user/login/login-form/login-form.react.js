/**
 * LoginForm Form Component
 */

var React = require('react');
var LoginActions = require('../../../actions/login-actions');

var LoginForm = React.createClass({

  getInitialState: function() {
    return {};
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <form id="login-form" className="form-horizontal" role="form" onSubmit={ this._handleSubmit } noValidate>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="email" className="form-control" id="inputEmail3" placeholder="Email" ref="email" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input type="password" className="form-control" id="inputPassword3" placeholder="Password" ref="password" />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <div className="checkbox">
              <label>
                <input type="checkbox"> Remember me</input>
              </label>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <button type="submit" className="btn btn-default btn-login">
              <i className="icon ion-log-in"></i> Sign in
            </button>
          </div>
        </div>
      </form>
    );
  },

  _handleSubmit: function(e) {
    e.preventDefault();

    var email = this.refs.email.getDOMNode().value.trim();
    var password = this.refs.password.getDOMNode().value.trim();

    if (!email || !password) {
      return;
    }

    console.log(email, password);

    LoginActions.submitLogin({
      login: email,
      password: password
    });
  }
});

module.exports = LoginForm;
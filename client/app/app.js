/**
 * React Draggable
 */

var React = require('react');
var Grid = require('./components/grid/grid.react');
var Header = require('./components/header/header.react');
var Admin = require('./components/admin/admin.react');
var AuthUtils = require('./utils/auth-utils');
var AuthStore = require('./stores/auth-store');
var AuthActions = require('./actions/auth-actions');
var LoginModal = require('./components/user/login-modal/login-modal.react');
var RegisterModal = require('./components/user/register-modal/register-modal.react');
var loggedInStatus = false;

function _getInitialState() {
  return {
    auth: {
      isLoggedIn: AuthStore.getLoggedInStatus(),
      isRegistered: AuthStore.getRegisteredStatus()
    }
  };
}

var App = React.createClass({

  getInitialState: function() {
    return _getInitialState();
  },

  componentDidMount: function() {
    AuthStore.addChangeListener(this._onStatusUpdate);
  },

  componentDidUnmount: function() {
    AuthStore.removeChangeListener(this._onStatusUpdate);
  },

  /**
   * @return {object}
   */
  render: function() {
    var loggedIn = this.state.auth.isLoggedIn;
    var registered = this.state.auth.isRegistered;

    console.log(registered);

    var modal = (function() {
      if (!loggedIn) {
        return <LoginModal />
      }

      if (!registered) {
        return <RegisterModal />
      }
    })();

    return (
      <div id="app">
        { modal }
        <Header />
        <Grid />
      </div>
    );
  },

  _onStatusUpdate: function() {
    this.setState(_getInitialState())
  }
});

/**
 * Init the AuthUtils service which will check if the client is currently logged
 * in or has a redirectToken.
 */
AuthUtils.init()
  .then(function(status) {

    console.log('AuthUtils.init() :: ', status);

    AuthActions.statusUpdate(status);

    React.render(
      <App />,
      document.body
    );
  })
  .then(null, function(err) {
    console.error(err.message);
    console.error(err);
  });
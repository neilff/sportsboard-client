/**
 * Sportsboard App Component
 */

global.__component_path = './components/';
global.__action_path = './actions/';
global.__store_path = './stores/';

var React = require('react');

var AuthUtils = require('./utils/auth-utils');
var AuthStore = require('./stores/auth-store');
var AuthActions = require('./actions/auth-actions');

var LoginModal = require('./components/user/login/login-modal/login-modal.react');
var RegisterModal = require('./components/user/register/register-modal/register-modal.react');
var PreferencesModal = require('./components/user/preferences/preferences-modal/preferences-modal.react');
var WidgetAddModal = require('./components/widget/widget-add/add-modal/add-modal.react');

var Grid = require('./components/grid/grid.react');
var Header = require('./components/header/header.react');

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
    var modalVisibility = this.state.modalVisibility;

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
        <PreferencesModal />
        <WidgetAddModal />
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

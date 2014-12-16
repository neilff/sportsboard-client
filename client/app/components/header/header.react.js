/**
 * Header Component
 */

var React = require('react');
var Logo = require('../ui/logo/logo.react');
var Dropdown = require('../ui/dropdown/dropdown.react');
var DropdownItem = require('../ui/dropdown/item/item.react');
var ProfileImage = require('../user/profile/profile-image/profile-image.react');
var LoginActions = require('../../actions/login-actions');
var UiActions = require('../../actions/ui-actions');
var AuthStore = require('../../stores/auth-store');
var Constants = require('../../constants/app-constants');

function _getInitialState() {
  return {
    user: AuthStore.getUserData()
  };
}

var Header = React.createClass({

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
    var userData = this.state.user;
    var username = null;
    var provider = null;
    var idWithProvider = null;

    if (userData) {
      username = userData.displayName || '';
      provider = userData.provider || '';
      idWithProvider = userData.idWithProvider || '';
    }

    return (
      <div className="header">
        <Logo />
        <div className="u-pull-right">
          <Dropdown
            title={ [<ProfileImage provider={ provider } userId={ idWithProvider } size="small" key="icon" />, username] }
            hasIcon={ true }>
              <DropdownItem title="Preferences" onClick={ this._showPreferences } />
              <DropdownItem title="Sign Out" onClick={ this._signOut } />
            </Dropdown>
        </div>
      </div>
    );
  },

  _signOut: function() {
    LoginActions.setCredentials(null);
  },

  _showPreferences: function() {
    UiActions.showModal(Constants.ModalTypes.PREFERENCES);
  },

  _onStatusUpdate: function(user) {
    this.setState(_getInitialState());
  }
});

module.exports = Header;
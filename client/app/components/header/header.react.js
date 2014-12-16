/**
 * Header Component
 */

var React = require('react');
var Logo = require('../ui/logo/logo.react');
var Dropdown = require('../ui/dropdown/dropdown.react');
var DropdownItem = require('../ui/dropdown/item/item.react');

var LoginActions = require('../../actions/login-actions');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="header">
        <Logo />
        <div className="u-pull-right">
          <Dropdown title="Settings">
            <DropdownItem>Preferences</DropdownItem>
            <DropdownItem onClick={ this._signOut }>Sign Out</DropdownItem>
          </Dropdown>
        </div>
      </div>
    );
  },

  _signOut: function() {
    LoginActions.setCredentials(null);
  }
});

module.exports = Header;
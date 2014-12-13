/**
 * Header Component
 */

var React = require('react');
var Logo = require('../ui/logo/logo.react');
var Dropdown = require('../ui/dropdown/dropdown.react');

var Header = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="header">
        <Logo />
        <div className="u-pull-right">
          <Dropdown title="Settings" />
        </div>
      </div>
    );
  }
});

module.exports = Header;
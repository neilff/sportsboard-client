/**
 * Admin Component
 */

var React = require('react');
var LogoutBtn = require('../user/logout-btn/logout-btn.react');
var AddWidgetBtn = require('./add-widget-btn/add-widget-btn.react');

var Admin = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <ul className="list-inline admin-buttons">
        <li>
          <AddWidgetBtn />
        </li>
        <li>
          <LogoutBtn />
        </li>
      </ul>
    );
  }
});

module.exports = Admin;
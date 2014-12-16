/**
 * Dropdown Item Component
 */

var React = require('react/addons');
var DropdownItem = React.createClass({

  propTypes: {
    onClick: React.PropTypes.func.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <li className="dropdown-item" { ...this.props }>
        { this.props.title }
      </li>
    );
  }
});

module.exports = DropdownItem;
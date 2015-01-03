/**
 * Dropdown Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;
var Dropdown = React.createClass({

  getInitialState: function() {
    return {
      isOpen: false
    }
  },

  /**
   * @return {object}
   */
  render: function() {

    var classes = cx({
      'dropdown': true,
      'dropdown--open': this.state.isOpen,
      'dropdown--closed': !this.state.isOpen,
      'dropdown--has-title': this.props.hasIcon
    });

    return (
      <div className={ classes }>
        <div className="dropdown__title"
          onClick={ this._toggleDropdownVisibility }>
            { this.props.title }
          </div>

        <ul className="dropdown__list"
          onClick={ this._toggleDropdownVisibility }>
          { this.props.children }
        </ul>
      </div>
    );
  },

  _toggleDropdownVisibility: function() {
    var currentState = this.state.isOpen;

    this.setState({
      isOpen: !currentState
    });
  }
});

module.exports = Dropdown;
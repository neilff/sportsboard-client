/**
 * Dropdown Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;
var Dropdown = React.createClass({

  propTypes: {
    title: React.PropTypes.string.isRequired
  },

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
      'dropdown--closed': !this.state.isOpen
    });

    return (
      <div className={ classes }>
        <div className="dropdown__title"
          onClick={ this._toggleDropdownVisibility }>{ this.props.title }</div>

        <ul className="dropdown__list">
          <li>Selection</li>
          <li>Selection</li>
          <li>Selection</li>
          <li>Selection</li>
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
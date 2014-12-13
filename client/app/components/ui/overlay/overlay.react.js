/**
 * Overlay Component
 */

var React = require('react');

var Overlay = React.createClass({

  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className="overlay">
        { this.props.children }
      </div>
    );
  }
});

module.exports = Overlay;
/**
 * Overlay Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;

var Overlay = React.createClass({

  propTypes: {
    children: React.PropTypes.element.isRequired,
    isVisible: React.PropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var classes = cx({
      'visible': this.props.isVisible,
      'hidden': !this.props.isVisible,
      'overlay': true
    });

    return (
      <div className={ classes }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = Overlay;
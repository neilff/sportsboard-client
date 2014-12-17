/**
 * Overlay Component
 */
var React = require('react/addons');
var cx = React.addons.classSet;
var UiActions = require('../../../actions/ui-actions');

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
      'overlay--visible': this.props.isVisible,
      'overlay--hidden': !this.props.isVisible,
      'overlay': true
    });

    return (
      <div className={ classes } onClick={ this._closeOverlay }>
        { this.props.children }
      </div>
    );
  },

  _closeOverlay: function() {
    UiActions.showModal(null);
  }
});

module.exports = Overlay;
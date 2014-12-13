/**
 * Input Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;
var Input = React.createClass({

  getDefaultProps: function() {
    return {
      type: 'text'
    }
  },

  /**
   * @return {object}
   */
  render: function() {

    var classes = cx({
      'u-full-width': true,
      'input': true,
      'input--error': this.props.isInvalid
    });

    return (
      <input { ...this.props } className={ classes }/>
    );
  }
});

module.exports = Input;
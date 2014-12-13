/**
 * Button Component
 */

var React = require('react');
var Button = React.createClass({

  getDefaultProps: function() {
    return {
      className: 'btn'
    }
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <button { ...this.props }>{ this.props.children }</button>
    );
  }
});

module.exports = Button;
/**
 * Label Component
 */

var React = require('react');
var Label = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <label { ...this.props } >{ this.props.children }</label>
    );
  }
});

module.exports = Label;
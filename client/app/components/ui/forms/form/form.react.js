/**
 * Form Component
 */

var React = require('react');
var Form = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    return (
      <form { ...this.props } role="form" noValidate>
        { this.props.children }
      </form>
    );
  }
});

module.exports = Form;
/**
 * Form Component
 */

var React = require('react');
var Form = React.createClass({

  propTypes: {
    onSubmit: React.PropTypes.func.isRequired
  },

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
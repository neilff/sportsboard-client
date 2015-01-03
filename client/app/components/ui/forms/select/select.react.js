/**
 * Select Component
 */

var React = require('react');
var Select = React.createClass({

  /**
   * @return {object}
   */
  render: function() {
    var selectOptions = this.props.options.map(function(opt) {
      return (
        <option key={ opt } value={ opt }>{ opt }</option>
      );
    });

    return (
      <select { ...this.props }>
        { selectOptions }
      </select>
    );
  }
});

module.exports = Select;
/**
 * Add Widget Button Component
 */

var React = require('react');
var WidgetActions = require('../../../actions/widget-actions');

var AddWidgetBtn = React.createClass({

  handleClick: function() {
    WidgetActions.addWidget({});
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <button
        className="btn btn-add"
        onClick={ this.handleClick }><i className="icon ion-ios7-plus-empty"></i> Add Widget</button>
    );
  }
});

module.exports = AddWidgetBtn;
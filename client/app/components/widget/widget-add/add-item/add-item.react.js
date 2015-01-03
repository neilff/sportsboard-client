/**
 * Widget Add Item Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;
var WidgetActions = require('../../../../actions/widget-actions');

var WidgetAddItem = React.createClass({

  propTypes: {
    widgetId: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {

    var classes = cx({
      'widget-add-item': true,
      'selected': this.props.selected
    });

    return (
      <li
        className={ classes }
        onClick={ this._toggleSelected }>
        <div className="widget-add-item--inner">
          { this.props.label }
        </div>
      </li>
    );
  },

  _toggleSelected: function() {

    var id = (this.props.selected) ?
      null :
      { id: this.props.widgetId };

    WidgetActions.selectNewWidget(id);
  }
});

module.exports = WidgetAddItem;
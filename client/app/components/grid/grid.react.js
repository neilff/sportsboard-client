/**
 * Draggable Grid
 */

var React = require('react');
var ReactPropTypes = React.PropTypes;
var Draggabilly = require('draggabilly');
var Widget = require('../widget/widget.react');
var WidgetStore = require('../../stores/widget-store');
var UiStore = require('../../stores/ui-store');
var UiActions = require('../../actions/ui-actions');
var _ = require('lodash');
var cx = require('react/lib/cx');

function _getInitialState() {
  return {
    allWidgets: WidgetStore.getAllWidgets(),
    isDragged: false
  }
}

var Grid = React.createClass({

  getInitialState: function() {
    return _getInitialState();
  },

  componentDidMount: function() {
    UiStore.addChangeListener(this._onDragging);
    WidgetStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    UiStore.removeChangeListener(this._onDragging);
    WidgetStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {

    if (Object.keys(this.state.allWidgets).length < 1) {
      return null;
    }

    var classes = cx({
      'is-dragged': this.state.isDragged,
      'subgrid': true
    });

    var gridContainer = '#grid';

    var allWidgets = this.state.allWidgets;
    var widgets = [];

    for (var key in allWidgets) {
      widgets.push(<Widget
        key={ key }
        config={ allWidgets[key] }
        gridContainer={ gridContainer } />);
    }

    return (
      <div id="grid">
        { widgets }

        <div className={ classes }></div>
      </div>
    );
  },

  _onDragging: function() {
    this.setState({
      isDragged: UiStore.getDragState()
    });
  },

  _onChange: function() {
    this.setState(_getInitialState());
  }
});

module.exports = Grid;
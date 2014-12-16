/**
 * Draggable Widget
 */

var React = require('react');
var R = require('ramda');
var Draggabilly = require('draggabilly');
var UiStore = require('../../stores/ui-store');
var UiActions = require('../../actions/ui-actions');
var cx = require('react/lib/cx');

var draggable = null;
var gridContainer = null;
var elem = null;

var _getInitialState = function() {
  return {
    isLocked: false
  }
}

var _createDraggable = function(elem, container) {
  return new Draggabilly(elem, {
    containment: container,
    grid: [20, 20],
    handle: '.handle'
  });
}

var Widget = React.createClass({

  getInitialState: function() {
    return _getInitialState();
  },

  componentDidMount: function() {
    elem = this.getDOMNode();
    gridContainer = this.props.gridContainer;
    elem.style.zIndex = 0;

    draggable = _createDraggable(elem, gridContainer);

    draggable.on('dragStart', function(instance) {
      UiActions.dragWidget(instance.element.style.zIndex);
      UiActions.dragStart();
      instance.element.style.zIndex = UiStore.getIndexCount();
    });

    draggable.on('dragEnd', function(instance) {
      UiActions.dragEnd();
    });
  },

  componentWillUnmount: function() {

  },

  /**
   * @return {object}
   */
  render: function() {

    var classes = cx({
      'widget': true,
      'locked': this.state.isLocked
    });

    var controlClasses = cx({
      'icon': true,
      'ion-locked': this.state.isLocked,
      'ion-unlocked': !this.state.isLocked,
    });

    return (
      <div className={ classes }>
        <div className="handle"></div>
        <div className="controls">
          <div className={ controlClasses }
               onClick={ this._toggleLocked }></div>
        </div>
      </div>
    );
  },

  _toggleLocked: function(event) {
    var isLocked = (this.state.isLocked) ? false : true;

    if (isLocked) {
      draggable.disable();
    } else {
      draggable.enable();
    }

    this.setState({
      isLocked: isLocked
    });
  }
});

module.exports = Widget;
/**
 * UI Store
 *
 * This store is responsible for handling the state of the UI.
 */

/**
 * Store Dependencies
 */
var _ = require('lodash');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/app-constants');

var WidgetActionsTypes = Constants.WidgetActionTypes;

var CHANGE_EVENT = 'WidgetChange';

var _widgets = {};
var _availableWidgets = [];
var _selectedNewWidget = null;
var _widgetFormValues = {};

/**
 * Create a widget.
 * @param  {string} text The content of the widget
 */
function create(text) {
  var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);

  _widgets[id] = {
    id: id,
    complete: false,
    text: text
  };
}

var WidgetStore = _.merge(EventEmitter.prototype, {

  getAvailableWidgets: function() {
    return _availableWidgets;
  },

  getSelectedNewWidget: function() {
    return _selectedNewWidget;
  },

  getSelectedNewWidgetOptions: function() {
    return (_availableWidgets && _selectedNewWidget) ?
      _availableWidgets[_selectedNewWidget.id].options :
      [];
  },

  getAllWidgets: function() {
    return _widgets;
  },

  getWidgetFormValues: function() {
    return _widgetFormValues;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

/**
 * Register store with the dispatcher
 *
 * Handle all events accordlingly
 *
 * @param {object} payload Payload object
 * @returns {boolean}
 */
AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case WidgetActionsTypes.RECEIVE_AVAIL_WIDGETS:
      _availableWidgets = action.response;
      WidgetStore.emitChange();
      break;

    case WidgetActionsTypes.ADD_WIDGET_FORM_CHANGE:
      _widgetFormValues[action.prop] = action.val;
      WidgetStore.emitChange();
      break;

    case WidgetActionsTypes.ADD_WIDGET_FORM_CLEAR:
      _widgetFormValues = {};
      _selectedNewWidget = null;
      WidgetStore.emitChange();
      break;

    case WidgetActionsTypes.SELECT_NEW_WIDGET:
      _selectedNewWidget = action.id;
      WidgetStore.emitChange();
      break;

    case WidgetActionsTypes.ADD_WIDGET:
      create('hello world');
      WidgetStore.emitChange();
      break;

    case WidgetActionsTypes.REMOVE_WIDGET:
      WidgetStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

module.exports = WidgetStore;

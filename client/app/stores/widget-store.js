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

var CHANGE_EVENT = 'WidgetChange';

var _widgets = {};

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

  getAllWidgets: function() {
    return _widgets;
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
    case Constants.WidgetActionTypes.ADD_WIDGET:
      create('hello world');
      break;

    case Constants.WidgetActionTypes.REMOVE_WIDGET:
      break;

    default:
      return true;
  }

  WidgetStore.emitChange();

  return true;
});

module.exports = WidgetStore;

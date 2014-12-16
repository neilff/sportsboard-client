/**
 * UI Store
 *
 * This store is responsible for handling the state of the UI.
 */

/**
 * Store Dependencies
 */
var _ = require('lodash');
var R = require('ramda');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var Constants = require('../constants/app-constants');

var CHANGE_EVENT = 'UiStateChange';

var _uiState = {
  zIndex: 1,
  isDragging: false,
  modalVisible: null
};

/**
 * Increases the z-index if it is required
 * @returns {undefined}
 */
function _increaseIndex(currentIndex) {
  if (currentIndex < _uiState.zIndex) {
    return _uiState.zIndex = (_uiState.zIndex + 1)
  } else {
    return _uiState.zIndex;
  }
}

function _setDragState(bool) {
  _uiState.isDragging = bool;
}

function _setVisible(visible) {
  _uiState.modalVisible = visible;
}

var UiStore = _.merge(EventEmitter.prototype, {

  /**
   * Get the status of the sidebar
   * @return {object}
   */
  getIndexCount: function() {
    return _uiState.zIndex;
  },

  getDragState: function() {
    return _uiState.isDragging;
  },

  getModalVisible: function() {
    return _uiState.modalVisible;
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
    case Constants.UiActionTypes.DRAG_WIDGET:
      _increaseIndex(action.state);
      UiStore.emitChange();
      break;

    case Constants.UiActionTypes.DRAG_START:
      _setDragState(true);
      UiStore.emitChange();
      break;

    case Constants.UiActionTypes.DRAG_END:
      _setDragState(false);
      UiStore.emitChange();
      break;

    case Constants.UiActionTypes.TOGGLE_MODAL:
      _setVisible(action.modal);

      console.log('TOGGLE_MODAL :: ', action.modal);
      UiStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

module.exports = UiStore;

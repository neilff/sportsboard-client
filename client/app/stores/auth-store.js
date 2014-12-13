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

var CHANGE_EVENT = 'AuthStateChange';

var _authState = {
  isLoggedIn: false,
  isRegistered: false
};

/**
 * Sets login status
 *
 * @param {boolean} bool
 * @returns {undefined}
 */
function _setLoginStatus(bool) {
  _authState.isLoggedIn = bool || false;
}

/**
 * Sets registered status
 *
 * @param {boolean} bool
 * @returns {undefined}
 */
function _setRegisteredStatus(bool) {
  _authState.isRegistered = bool || false;
}

var AuthStore = _.merge(EventEmitter.prototype, {

  /**
   * Returns logged in status
   *
   * @return {boolean}
   */
  getLoggedInStatus: function() {
    return _authState.isLoggedIn;
  },

  /**
   * Returns registered status
   *
   * @returns {boolean}
   */
  getRegisteredStatus: function() {
    return _authState.isRegistered;
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

  console.log(action);

  switch(action.actionType) {
    case Constants.AuthActionTypes.STATUS_UPDATE:
      var isAuthenticated = false;
      var isRegistered = false;

      if (action.status) {
        isAuthenticated = action.status.isAuthenticated || false;
        isRegistered = action.status.meta.isRegistered || false;
      }

      _setLoginStatus(isAuthenticated);
      _setRegisteredStatus(isRegistered);

      AuthStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

module.exports = AuthStore;

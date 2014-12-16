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

var _user = {
  data: null
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

/**
 * Sets user info
 *
 * @param {object} user
 * @returns {undefined}
 */
function _setUserData(user) {
  _user.data = user || null;
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

  /**
   * Returns the user data
   *
   * @returns {object}
   */
  getUserData: function() {
    return _user.data;
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
    case Constants.AuthActionTypes.STATUS_UPDATE:
      var isAuthenticated = false;
      var isRegistered = false;
      var userData = null;

      if (action.status) {
        isAuthenticated = action.status.isAuthenticated || false;
        isRegistered = action.status.meta.isRegistered || false;
        userData = action.status.data || null;
      }

      _setLoginStatus(isAuthenticated);
      _setRegisteredStatus(isRegistered);
      _setUserData(userData);

      AuthStore.emitChange();
      break;

    default:
      return true;
  }

  return true;
});

module.exports = AuthStore;

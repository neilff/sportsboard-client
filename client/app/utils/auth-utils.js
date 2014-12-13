var localForage = require('localforage');
var keyMirror = require('react/lib/keyMirror');
var AuthActions = require('../actions/auth-actions');
var queryString = require('query-string');
var Q = require('q');
var UrlUtils = require('../utils/url-utils');
var Constants = require('../constants/app-constants');
var UserApi = require('../api/user-api');

var API = keyMirror({
  API_KEY: null
});

/**
 * AuthUtils Service
 *
 * Provides helper methods for getting / setting authentication status
 *
 * @returns {object}
 */
var AuthUtils = (function() {

  var isLoggedIn = false;
  var tokenKey = null;

  /**
   * Add or remove an API key from localstorage
   *
   * @param {string} key API Key
   * @returns {promise}
   */
  function configureCredentials(key) {

    if (key) {

      isLoggedIn = true;
      configAuthInterceptor(key);
      return localForage.setItem(API.API_KEY, key);
    } else {

      isLoggedIn = false;
      configAuthInterceptor(null);
      return localForage.setItem(API.API_KEY, null);
    }
  }

  /**
   * Returns the API key from localstorage
   *
   * @returns {string}
   */
  function getApiKey() {
    return localForage.getItem(API.API_KEY)
      .then(function(key) {

        configureCredentials(key);
        return key;
      });
  }

  /**
   * Adds the users authorization token to the header on every request.
   *
   * @param {string} key Authorization key
   * @returns {undefined}
   */
  function configAuthInterceptor(key) {
    Q.xhr.interceptors.push({
      request: function(config) {

        return localForage.getItem(API.API_KEY)
          .then(function(key) {

            config.headers = config.headers || {};

            if (key) {
              config.headers.Authorization = 'Bearer ' + key;
            } else {
              delete config.headers.Authorization;
            }

            return config;
          });
      }
    });
  }

  /**
   * On init, check if the client has been provided a redirectToken, which
   * implies they are processing their login. Otherwise, check if they have an
   * API key, and attempt to use it against the API if so. Returns a promise
   * which contains the current logged in status.
   *
   * @returns {promise}
   */
  function init() {

    /**
     * queryString parses hashes awkwardly, because Koast passes back a hash
     * for use in Angular, queryString assumes you want everything after it
     * and includes the question mark in the object property.
     */
    var queryStringObj = queryString.parse(location.hash);
    var redirectToken = queryStringObj['?redirectToken'];

    if (redirectToken) {

      return configureCredentials(redirectToken)
        .then(function() {

          UrlUtils.clearUrlHash();
          return refreshToken();
        });
    } else {

      return getStatus()
        .then(function(loggedIn) {

          if (loggedIn) {
            return refreshToken();
          } else {
            return false;
          }
        })
        .then(null, function(err) {
          // Handles expired JWT tokens
          return false;
        });
    }
  }

  /**
   * Returns logged in status
   *
   * @returns {boolean}
   */
  function getStatus() {
    return getApiKey()
      .then(function() {

        return isLoggedIn;
      });
  }

  /**
   * Attempts to exchange login credentials for a token
   * with the backend service.
   *
   * @param {object} user User object
   * @returns {promise}
   */
  function setCredentials(user) {
    return configureCredentials(user)
      .then(function() {
        return isLoggedIn;
      });
  }

  /**
   * Destroys the users token and sets the isLoggedIn state to false.
   *
   * @returns {promise}
   */
  function deleteCredentials() {
    return configureCredentials(null)
      .then(function() {
        return isLoggedIn = false;
      });
  }

  /**
   * Exchange the provided token for an updated one, and set credentials.
   *
   * @returns {promise}
   */
  function refreshToken() {
    return UserApi.getTokenRefresh()
      .then(function(res) {
        return configureCredentials(res.token);
      })
      .then(function(res) {
        return UserApi.getUser();
      });
  }

  return {

    init: init,

    getStatus: getStatus,

    setCredentials: setCredentials,

    deleteCredentials: deleteCredentials

  };
})();

module.exports = AuthUtils;
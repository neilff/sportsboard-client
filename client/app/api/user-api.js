var Server = require('../utils/server-utils');

var UserApi = (function() {

  /**
   * Exchanges an expiring token for a fresh token
   *
   * @param {string} token Token to be refreshed
   * @returns {promise}
   */
  function getTokenRefresh(token) {
    return Server.get('/auth/token/refresh')
      .then(function(response) {
        return response.data;
      });
  }

  /**
   * Retrieves the user details for the current user
   *
   * @returns {promise}
   */
  function getUser() {
    return Server.get('/api/user/me')
      .then(function(response) {
        return response.data;
      });
  }

  /**
   * Creates a new user
   *
   * User Object
   * ===========
   *
   * {
   *   "displayName": "user",
   *   "password": "12345",
   *   "email": "mail@mail.com"
   * }
   *
   * @param {object} user User object
   * @returns {promise}
   */
  function createUser(user) {
    return Server.post('/auth/user', user)
      .then(function(response) {
        return response.data;
      });
  }

  /**
   * Update the current user
   *
   * @param {object} user User object
   * @returns {promise}
   */
  function updateUser(user) {
    return Server.put('/auth/user', user)
      .then(function(response) {
        return response.data;
      });
  }

  return {

    getTokenRefresh: getTokenRefresh,

    getUser: getUser,

    updateUser: updateUser,

    createUser: createUser

  }
})();

module.exports = UserApi;
var AppDispatcher = require('../dispatchers/app-dispatcher');
var Constants = require('../constants/app-constants.js');
var AuthUtils = require('../utils/auth-utils');
var AuthActions = require('../actions/auth-actions');

var LoginActions = {

  /**
   * Attempts to submit a login to the login service.
   *
   * @param {string} provider The provider you wish to use
   * @param {object} user User object (optional)
   * @returns {undefined}
   */
  submitLogin: function(provider, user) {

    switch(provider) {
      case 'facebook':
        console.log('facebook');
      default:
        throw new Error('Invalid social provider', provider);
    }
  },

  /**
   * Sets the provided user object in the AuthUtils service. Provide it a
   * null object to remove credentials.
   *
   * @param {object} user User object
   * @returns {undefined}
   */
  setCredentials: function(user) {
    AuthUtils.setCredentials(user)
      .then(function(status) {

        AppDispatcher.handleViewAction({
          actionType: Constants.AuthActionTypes.STATUS_UPDATE,
          status: status
        });
      });
  }
};

module.exports = LoginActions;
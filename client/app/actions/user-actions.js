var AppDispatcher = require('../dispatchers/app-dispatcher');
var Constants = require('../constants/app-constants.js');
var UserApi = require('../api/user-api');

/**
 * User Actions
 *
 * This service handles actions that the user can perform on their account.
 * Such as registering, updating their preferences, and removing their account.
 */
var UserActions = {

  registerUser: function(user) {

    UserApi.updateUser(user)
      .then(function(response) {

        AppDispatcher.handleServerAction({
          actionType: Constants.AuthActionTypes.STATUS_UPDATE,
          status: response
        });
      })
      .then(null, function(err) {
        // TODO: Add API err handler, modal, something simple
        console.log(err);
      });
  }
};

module.exports = UserActions;
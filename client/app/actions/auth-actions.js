var AppDispatcher = require('../dispatchers/app-dispatcher');
var Constants = require('../constants/app-constants.js');
var AuthUtils = require('../utils/auth-utils');

/**
 * AuthActions
 *
 * This service handles authorization actions
 */
var AuthActions = {

  statusUpdate: function(status) {
    AppDispatcher.handleViewAction({
      actionType: Constants.AuthActionTypes.STATUS_UPDATE,
      status: status
    });
  }
};

module.exports = AuthActions;
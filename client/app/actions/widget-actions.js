var AppDispatcher = require('../dispatchers/app-dispatcher');
var Constants = require('../constants/app-constants.js');

/**
 * WidgetActions
 *
 * This service handles performing widget CRUD operations
 */
var UiActions = {

  addWidget: function(config) {
    AppDispatcher.handleViewAction({
      actionType: Constants.WidgetActionTypes.ADD_WIDGET,
      config: config
    });
  },

  removeWidget: function(id) {
    AppDispatcher.handleViewAction({
      actionType: Constants.WidgetActionTypes.REMOVE_WIDGET,
      id: id
    });
  }
};

module.exports = UiActions;
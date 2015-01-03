var AppDispatcher = require('../dispatchers/app-dispatcher');
var Constants = require('../constants/app-constants.js');
var WidgetApi = require('../api/widget-api');

var WidgetActionTypes = Constants.WidgetActionTypes;

/**
 * WidgetActions
 *
 * This service handles performing widget CRUD operations
 */
var WidgetActions = {

  getAvailableWidgets: function() {
    WidgetApi.getAvailableWidgets()
      .then(function(response) {

        AppDispatcher.handleServerAction({
          actionType: WidgetActionTypes.RECEIVE_AVAIL_WIDGETS,
          response: response
        });
      });
  },

  selectNewWidget: function(widgetId) {
    AppDispatcher.handleViewAction({
      actionType: WidgetActionTypes.SELECT_NEW_WIDGET,
      id: widgetId
    });
  },

  addWidget: function(config) {
    AppDispatcher.handleViewAction({
      actionType: WidgetActionTypes.ADD_WIDGET,
      config: config
    });
  },

  addWidgetFormChange: function(key, val) {
    AppDispatcher.handleViewAction({
      actionType: WidgetActionTypes.ADD_WIDGET_FORM_CHANGE,
      prop: key,
      val: val
    });
  },

  addWidgetFormClear: function() {
    AppDispatcher.handleViewAction({
      actionType: WidgetActionTypes.ADD_WIDGET_FORM_CLEAR,
      selected: null
    });
  },

  removeWidget: function(id) {
    AppDispatcher.handleViewAction({
      actionType: WidgetActionTypes.REMOVE_WIDGET,
      id: id
    });
  }
};

module.exports = WidgetActions;
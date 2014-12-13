var Dispatcher = require('flux').Dispatcher;
var _ = require('lodash');

var Constants = require('../constants/app-constants');

/**
 * App Dispatcher
 *
 * This will handle all events coming from the App
 */
var AppDispatcher = _.extend(new Dispatcher(), {

  /**
   * A bridge function between the views and the dispatcher, marking the action
   * as a view action.
   * @param  {object} action The data coming from the view.
   */
  handleServerAction: function(action) {
    this.dispatch({
      source: Constants.PayloadSources.SERVER_ACTION,
      action: action
    });
  },

  handleViewAction: function(action) {
    this.dispatch({
      source: Constants.PayloadSources.VIEW_ACTION,
      action: action
    });
  }

});

module.exports = AppDispatcher;
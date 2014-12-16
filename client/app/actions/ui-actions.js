var AppDispatcher = require('../dispatchers/app-dispatcher');
var Constants = require('../constants/app-constants.js');

/**
 * UiActions
 *
 * This service handles performing simple UI interactions
 */
var UiActions = {

  dragWidget: function(currentIndex) {
    AppDispatcher.handleViewAction({
      actionType: Constants.UiActionTypes.DRAG_WIDGET,
      state: currentIndex
    });
  },

  dragStart: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.UiActionTypes.DRAG_START,
      state: true
    });
  },

  dragEnd: function() {
    AppDispatcher.handleViewAction({
      actionType: Constants.UiActionTypes.DRAG_END,
      state: false
    });
  },

  showModal: function(modal) {
    AppDispatcher.handleViewAction({
      actionType: Constants.UiActionTypes.TOGGLE_MODAL,
      modal: modal
    });
  }
};

module.exports = UiActions;
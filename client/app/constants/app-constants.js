/**
 * Game Constants
 *
 * @type {object}
 */
var keyMirror = require('react/lib/keyMirror');
var config = null;

/**
 * Load required JSON configuration
 */
config = (window.location.host.indexOf('localhost') > -1)
  ? require('../config/dev.json')
  : require('../config/prod.json');

module.exports = {

  UiActionTypes: keyMirror({
    DRAG_WIDGET: null,
    DRAG_START: null,
    DRAG_END: null
  }),

  AuthActionTypes: keyMirror({
    LOGGED_IN: null,
    LOGGED_OUT: null,
    STATUS_UPDATE: null
  }),

  WidgetActionTypes: keyMirror({
    ADD_WIDGET: null,
    REMOVE_WIDGET: null
  }),

  PayloadSources: keyMirror({
    SERVER_ACTION: null,
    VIEW_ACTION: null
  }),

  ApiSources: {
    ApiUrl: config.apiUrl,
    facebookLoginUrl: config.facebookLoginUrl
  },

  Api: keyMirror({
    API_KEY: null
  })
};

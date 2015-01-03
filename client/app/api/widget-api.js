var Server = require('../utils/server-utils');

var WidgetApi = (function() {

  /**
   * Retrieves all the available widgets
   *
   * @returns {promise}
   */
  function getAvailableWidgets() {
    return Server.get('/api/widgets/')
      .then(function(response) {
        return response.data;
      });
  }

  return {

    getAvailableWidgets: getAvailableWidgets

  }
})();

module.exports = WidgetApi;
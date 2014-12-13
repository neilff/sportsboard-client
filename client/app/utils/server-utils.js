var Q = require('q-xhr')(window.XMLHttpRequest, require('q'));
var Constants = require('../constants/app-constants');
var ApiUrl = Constants.ApiSources.ApiUrl;

var Server = (function() {

  /**
   * Wrapper for XHR GET
   *
   * @returns {promise}
   */
  function get(endpoint, config) {

    config = config || {};

    return Q.xhr.get(ApiUrl + endpoint, config);
  }

  /**
   * Wrapper for XHR POST
   *
   * @returns {promise}
   */
  function post(endpoint, data, config) {

    data = data || {};
    config = config || {};

    return Q.xhr.post(ApiUrl + endpoint, data, config);
  }

  /**
   * Wrapper for XHR PUT
   *
   * @returns {promise}
   */
  function put(endpoint, data, config) {

    data = data || {};
    config = config || {};

    return Q.xhr.put(ApiUrl + endpoint, data, config);
  }

  /**
   * Wrapper for XHR DELETE
   *
   * @returns {promise}
   */
  function destroy(endpoint, config) {

    config = config || {};

    return Q.xhr.delete(ApiUrl + endpoint, config);
  }

  return {

    get: get,

    post: post,

    put: put,

    destroy: destroy

  }
})();

module.exports = Server;
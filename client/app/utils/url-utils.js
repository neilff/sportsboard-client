var Constants = require('../constants/app-constants.js');
var queryString = require('query-string');

var UrlUtils = (function() {

  /**
   * Redirect the client to the provided URL
   *
   * @param {string} url HTTP Url
   * @returns {undefined}
   */
  function redirect(url) {
    window.location.href = url;
  }

  function gotoFacebookLogin() {
    window.location.href = Constants.ApiSources.facebookLoginUrl;
  }

  function clearUrlHash() {
    // window.location.href = window.location.href.split('#')[0];
    // location.search = queryString.stringify();
    history.pushState('', document.title, window.location.pathname +
      window.location.search);
  }

  return {

    redirect: redirect,

    gotoFacebookLogin: gotoFacebookLogin,

    clearUrlHash: clearUrlHash

  }
})()

module.exports = UrlUtils;
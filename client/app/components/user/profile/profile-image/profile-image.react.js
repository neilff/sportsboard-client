/**
 * User Profile Image Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;

var ProfileImage = React.createClass({

  propTypes: {
    size: React.PropTypes.string.isRequired
  },

  getUserProfileImage: function(provider, userId) {
    var providers = {
      facebook: 'http://graph.facebook.com/' + userId + '/picture'
    }

    return providers[provider] || false;
  },

  /**
   * @return {object}
   */
  render: function() {
    var imageClasses = {
      'profile-image': true
    }

    imageClasses['profile-image--' + this.props.size] = true;

    var classes = cx(imageClasses);
    var image = this.getUserProfileImage(this.props.provider, this.props.userId);

    if (image) {
      return (
        <img src={ image } className={ classes } />
      );
    } else {
      return (
        <span></span>
      );
    }
  }
});

module.exports = ProfileImage;
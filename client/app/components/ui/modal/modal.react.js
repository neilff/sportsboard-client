/**
 * Login Component
 */

var React = require('react');
var Overlay = require('../overlay/overlay.react');

var Modal = React.createClass({

  propTypes: {
    children: React.PropTypes.element.isRequired,
    title: React.PropTypes.string.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <Overlay>
        <div className="modal">
          <div className="modal__title">
            { this.props.title }
          </div>
          <div className="modal__body">
            { this.props.children }
          </div>
        </div>
      </Overlay>
    );
  }
});

module.exports = Modal;
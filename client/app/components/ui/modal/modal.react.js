/**
 * Login Component
 */

var React = require('react');
var Overlay = require('../overlay/overlay.react');
var ModalCloseBtn = require('./modal-close-btn/modal-close-btn.react');

var Modal = React.createClass({

  propTypes: {
    children: React.PropTypes.element.isRequired,
    title: React.PropTypes.string.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var closeBtn = (this.props.hasClose) ?
      <ModalCloseBtn /> :
      null;

    return (
      <Overlay isVisible={ this.props.isVisible }>
        <div className="modal">
          <div className="modal__title">
            { this.props.title }
            { closeBtn }
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
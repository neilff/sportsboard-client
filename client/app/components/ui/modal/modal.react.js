/**
 * Login Component
 */

var React = require('react/addons');
var cx = React.addons.classSet;
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
    var closeBtn = null;

    var modalClasses = {
      'modal': true
    }

    if (this.props.size) {
      modalClasses['modal--' + this.props.size] = true;
    }

    if (this.props.hasClose) {
      closeBtn = <ModalCloseBtn />
    }

    return (
      <Overlay isVisible={ this.props.isVisible }>
        <div
          className={ cx(modalClasses) }
          onClick={ this._stopProp }>
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
  },

  _stopProp: function(e) {
    e.stopPropagation();
  }
});

module.exports = Modal;
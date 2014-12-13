/**
 * Layout Components
 *
 * These provide components for building layout, currently setup for
 * Bootstrap 3.0
 */

var React = require('react');

function containerClass(isFluid) {
  return (isFluid) ?
    'container-fluid' :
    'container';
}

var breakpoints = {
  xs: 'xs',
  sm: 'sm',
  md: 'md',
  lg: 'lg'
}

function columnClass(col, breakpoint) {
  var size = breakpoints[breakpoint] || 'xs';
  var columns = (col > 0 && col <= 12) ?
    col :
    12;

  return 'col-' + size + '-' + columns;
}

var Container = React.createClass({

  propTypes: {
    children: React.PropTypes.element.isRequired,
    fluid: React.PropTypes.bool.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var children = this.props.children || '';

    console.log(children);

    return (
      <div className={ containerClass(this.props.fluid) }>
        { children }
      </div>
    );
  }
});

var Row = React.createClass({

  propTypes: {
    children: React.PropTypes.element.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var classes = function() {
      return (this.props.className) ?
        'row ' + className :
        'row';
    }

    return (
      <div className="row">
        { this.props.children }
      </div>
    );
  }
});

var Column = React.createClass({

  propTypes: {
    children: React.PropTypes.element.isRequired,
    columns: React.PropTypes.string.isRequired,
    breakpoint: React.PropTypes.string.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    return (
      <div className={ columnClass(this.props.columns, this.props.breakpoint) }>
        { this.props.children }
      </div>
    );
  }
});

module.exports = {
  Row: Row,
  Container: Container,
  Column: Column
};
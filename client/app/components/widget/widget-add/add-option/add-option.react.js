/**
 * Widget Add Option Component
 */

var React = require('react/addons');
var R = require('ramda');
var cx = React.addons.classSet;
var WidgetActions = require('../../../../actions/widget-actions');

var Input = require('../../../ui/forms/input/input.react');
var Label = require('../../../ui/forms/label/label.react');
var Select = require('../../../ui/forms/select/select.react');

function checkValidity(rules, val) {
  var invalid = true;
  var isRequired = rules.required;

  if (isRequired && val && val.length > 0) {
    invalid = false;
  }

  if (rules.pattern) {
    console.log('TODO: Implement regex check');
  }

  return invalid;
}

var WidgetAddOption = React.createClass({

  getInitialState: function() {
    return this._getCurrentState(this.props.default);
  },

  componentDidMount: function() {
    var initialVal = this.props.default;

    WidgetActions.addWidgetFormChange(this.props.details.key,
      this._getCurrentState(initialVal));
  },

  /**
   * @return {object}
   */
  render: function() {

    var label = this.props.details.label;
    var options = this.props.details.options;
    var type = this.props.details.type;

    var classes = cx({
      'form--group': true,
      'form-input--invalid': this.state.invalid,
      'form-input--valid': !this.state.invalid
    });

    /**
     * Render based on the type of item
     */
    switch (type) {

      case 'text':
        return (
          <div className={ classes }>
            <Label>{ label }</Label>
            <Input

              type="text"
              placeholder={ this.props.details.placeholder }
              value={ this.state.value }
              onChange={ this._onChange }
              isInvalid={ this.state.invalid }
              ref="input" />
          </div>
        );

      case 'select':
        return (
          <div className={ classes }>
            <Label>{ label }</Label>
            <Select
              onChange={ this._onChange }
              options={ options } />
          </div>
        );

      default:
        throw new Error('Invalid type provided to Widget Add Option');
    }
  },

  _onChange: function(event) {

    var currentState = this._getCurrentState(event.target.value);

    WidgetActions.addWidgetFormChange(this.props.details.key, currentState);

    this.setState(currentState);
  },

  _getCurrentState: function(value) {

    var currentValue = (value.length > 0) ?
      value :
      null;

    var rules = this.props.details.rules;

    return {
      value: currentValue,
      invalid: checkValidity(rules, currentValue)
    };
  }
});

module.exports = WidgetAddOption;
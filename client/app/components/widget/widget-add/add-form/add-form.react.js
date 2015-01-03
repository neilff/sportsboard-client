/**
 * Widget Add Form Component
 */

var React = require('react/addons');
var R = require('ramda');

var cx = React.addons.classSet;
var WidgetActions = require('../../../../actions/widget-actions');
var WidgetStore = require('../../../../stores/widget-store');
var UiActions = require('../../../../actions/ui-actions');

var Form = require('../../../ui/forms/form/form.react');
var Button = require('../../../ui/forms/button/button.react');
var Label = require('../../../ui/forms/label/label.react');
var Input = require('../../../ui/forms/input/input.react');

var WidgetAddItem = require('../add-item/add-item.react');
var WidgetAddOption = require('../add-option/add-option.react');

function _getInitialState() {
  return {
    availableWidgets: WidgetStore.getAvailableWidgets(),
    selectedWidget: WidgetStore.getSelectedNewWidget(),
    selectedWidgetOptions: WidgetStore.getSelectedNewWidgetOptions(),
    values: WidgetStore.getWidgetFormValues()
  };
}

var WidgetAddForm = React.createClass({

  getInitialState: function() {
    return _getInitialState();
  },

  /**
   * Request the list of available widgets
   */
  componentDidMount: function() {
    WidgetActions.getAvailableWidgets();
    WidgetStore.addChangeListener(this._onWidgetChange);
  },

  componentDidUnmount: function() {
    WidgetStore.removeChangeListener(this._onWidgetChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var bind = this;

    var selectedWidgetOptions = this.state.selectedWidgetOptions;
    var availableWidgets = R.values(this.state.availableWidgets);
    var selectedWidget = (this.state.selectedWidget) ?
      this.state.selectedWidget.id :
      null;

    /**
     * Build widgets list
     */
    var widgetsList = R.map(function(widget) {

      if (widget.enabled) {
        return (
          <WidgetAddItem
            key={ widget.id }
            widgetId={ widget.id }
            label={ widget.label }
            selected={ widget.id === selectedWidget } />
        );
      }
    }, availableWidgets);

    /**
     * Build options list
     */
    var widgetOptionsList = R.mapObj(function(option) {

      return (
        <WidgetAddOption
          key={ option.key }
          details={ option }
          default={ option.default } />
      );
    }, selectedWidgetOptions);

    /**
     * Build action buttons
     */
    var buttons = (function(selected, bind) {

      if (selected) {
        return (
          <div className="form--group text--center">
            <Button
              className="btn btn--inline btn--blue">
              <i className="icon ion-plus"></i> Add Widget
            </Button>

            <Button
              className="btn btn--inline btn--red"
              onClick={ bind._onBtnCancel }>
              <i className="icon ion-cancel"></i> Cancel
            </Button>
          </div>
        );
      }
    })(selectedWidget, bind);

    return (
      <Form
        className="widget-add--form"
        onSubmit={ this._handleAddWidget }>
        <div className="container">
          <div className="row">
            <div className="two columns">
              <ul classname="list--unstyled">
                { widgetsList }
              </ul>
            </div>
            <div className="ten columns">
              { widgetOptionsList }
              { buttons }
            </div>
          </div>
        </div>
      </Form>
    );
  },

  _onBtnCancel: function(e) {
    e.preventDefault();

    WidgetActions.addWidgetFormClear();
    UiActions.closeModal();
  },

  _handleAddWidget: function(e) {
    e.preventDefault();

    console.log(this.state);
  },

  _onWidgetChange: function() {
    this.setState(_getInitialState());
  }
});

module.exports = WidgetAddForm;
import * as React from 'react';

import { isFunc, consoleError } from '../utils';

/*
* @param {Consumer} is Context.Consumer
* @param {dispatch} is funtion to dispatch actions
* @returns {WrapperComponent} with component has state and funtion in store
*/

var withConnect = function withConnect(Consumer, dispatch) {
  return function (mapStateToProps, mapDispatchToProps) {
    return function (Component) {
      var nextProps = void 0;
      var StoreProps = {};
      var displayName = 'Connect(' + (Component.displayName || Component.name || 'Unknow') + ')';

      var saveProps = function saveProps(value) {
        StoreProps.prevProps = Object.assign({}, value);
      };

      var WrapperComponent = function WrapperComponent(props) {
        return React.createElement(
          Consumer,
          null,
          function (data) {

            var state = isFunc(mapStateToProps) ? mapStateToProps(data, props) : {};
            var actions = isFunc(mapDispatchToProps) ? mapDispatchToProps(dispatch) : {};

            nextProps = Object.assign({}, props, state, actions);

            /*
            * Because all Consumers that are descendants of a Provider will re-render whenever the
            * Provider’s value prop changes .... So, there are many component connect to store will re-render even when value hasn't changed
            * We will check prevProps and nextProps of Connected Component and override function shouldComponentUpdate
            */
            if (StoreProps.prevProps && JSON.stringify(StoreProps.prevProps) === JSON.stringify(nextProps)) {
              if (Component.prototype === undefined) {
                consoleError('Warning: You connect with Functional Component...Your component will re-render even when value has not changed... We recommend use Class Component to connect in Provider');
              } else {
                Component.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
                  return false;
                };
              }
            } else {
              if (Component.prototype === undefined) {
                consoleError('Warning: You connect with Functional Component...Your component will re-render even when value has not changed... We recommend use Class Component to connect in Provider');
              } else {
                Component.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
                  return true;
                };
              }

              saveProps(nextProps);
            }

            return React.createElement(Component, nextProps);
          }
        );
      };

      WrapperComponent.displayName = displayName;

      return WrapperComponent;
    };
  };
};

export default withConnect;
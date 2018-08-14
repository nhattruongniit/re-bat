var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import * as React from 'react';

import withConnect from './connect';
import withProvider from './Provider';

import { consoleError, getInitial } from './utils';

/*
* @param {globalConfig} is Object has modules containes all state and actions what you want save to store
* @returns {Provider, connect, dispatch, getState, subscribe }
*/

var createStore = function createStore(globalConfig) {
  if ((typeof globalConfig === 'undefined' ? 'undefined' : _typeof(globalConfig)) !== 'object') throw new Error('globalConfig must be object');

  var root = globalConfig.root,
      logger = globalConfig.logger;


  var initialState = {};
  var actions = {};
  var isLogger = logger ? logger : false;

  initialState = getInitial(root, 'initialState');
  actions = getInitial(root, 'actions');

  var context = React.createContext();

  var provider = void 0;
  var isDispatching = false;
  var listeners = [];
  var state = initialState;

  /*
  * @param {seft} is Provider Component
  */

  var currentComponent = function currentComponent(self) {
    provider = {
      setState: function setState(type, key, state, isLogger, callback) {
        return self.customSetState(type, key, state, isLogger, callback);
      }
    };
  };

  /*
  * @param {listener} is function what you call everytime when you dispatch a action
  * @returns {function} like unSubscrire function
  */

  var subscribe = function subscribe(listener) {

    var isSubscribe = true;

    if (typeof listener !== 'function') throw new Error('Listener must be funtion');

    if (isDispatching) consoleError('Can not subscribe when dispatch function...');

    listeners = [].concat(_toConsumableArray(listeners), [listener]);

    return function () {
      if (!isSubscribe) return;

      isSubscribe = false;

      return listeners.filter(function (l) {
        return l !== listener;
      });
    };
  };

  /*
  * @returns {any} current state in your store
  */

  var getState = function getState() {
    if (isDispatching) consoleError('Can not get state when dispatch function...');

    return state;
  };

  /*
  * @param {type} is name of actions you register in module of store
  * @param {key} is name of your module what you want to dispatch
  */

  var dispatch = function dispatch(type, key) {
    return function () {
      for (var _len = arguments.length, arg = Array(_len), _key = 0; _key < _len; _key++) {
        arg[_key] = arguments[_key];
      }

      if (!provider) throw new Error('<Provider /> is undefined');

      if (typeof key !== 'string' && !actions[key] && !state[key]) {
        consoleError('Can not find ' + key + ' in root');
        return;
      }

      if (!actions[key] || !actions[key][type] || typeof actions[key][type] !== 'function') {
        consoleError('Action ' + type + ' can not find in ' + key);
        return;
      }

      var result = void 0;
      try {
        var _actions$key;

        isDispatching = true;

        result = (_actions$key = actions[key])[type].apply(_actions$key, [{
          state: state[key],
          dispatch: dispatch,
          rootState: state
        }].concat(arg));

        if (result && typeof result.then === 'function') {
          result.then(function (r) {
            return state = Object.assign({}, state, _defineProperty({}, key, Object.assign({}, r)));
          });
        } else state = Object.assign({}, state, _defineProperty({}, key, Object.assign({}, result)));
      } finally {
        isDispatching = false;
      }

      listeners.forEach(function (l) {
        return l({ getState: getState });
      });

      return result && typeof result.then === 'function' ? result.then(function (r) {
        return provider.setState(type, key, Object.assign({}, state[key], r), isLogger);
      }) : provider.setState(type, key, Object.assign({}, state[key], result), isLogger);
    };
  };

  var Provider = withProvider(initialState, context.Provider, currentComponent);
  var connect = withConnect(context.Consumer, dispatch);

  return { Provider: Provider, connect: connect, dispatch: dispatch, getState: getState, subscribe: subscribe };
};

export default createStore;
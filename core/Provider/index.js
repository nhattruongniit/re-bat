var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import * as React from 'react';

import { logger } from '../utils';

/*
* @param {initialState} is data default when create store
* @param {GlobalProvider} is Context.Provider
* @param {currentComponent} is this component...because data is saved state in Provider so we need to this to change state
* @return {Provider} component
*/

var withProvider = function withProvider(initialState, GlobalProvider, currentComponent) {
  return function (_React$Component) {
    _inherits(Provider, _React$Component);

    function Provider(props) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, (Provider.__proto__ || Object.getPrototypeOf(Provider)).call(this, props));

      _this.customSetState = function (type, key, value, isLogger, callback) {
        var prevState = Object.assign({}, _this.state);

        _this.setState(Object.assign({}, _this.state, _defineProperty({}, key, Object.assign({}, value))), function () {
          if (process.env.NODE_ENV !== 'production' && isLogger) {
            logger({ state: prevState, result: _this.state, type: type + ' - ' + key });
          }
        });
      };

      currentComponent(_this);
      _this.state = props.initialState || initialState;
      return _this;
    }

    _createClass(Provider, [{
      key: 'render',
      value: function render() {
        return React.createElement(
          GlobalProvider,
          { value: this.state },
          React.Children.only(this.props.children)
        );
      }
    }]);

    return Provider;
  }(React.Component);
};

export default withProvider;
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/*
* @param {value} to check is function or not
* @returns {boolean}
*/
export var isFunc = function isFunc(value) {
  return value && typeof value === 'function';
};

/*
* @param {message} to console error in develop tools
*/
export var consoleError = function consoleError(message) {
  return console && console.error && console.error(message);
};

/*
* @param {type, state, result} is type of actions, prev state, and result after dispatch actions
*/
export var logger = function logger(_ref) {
  var type = _ref.type,
      state = _ref.state,
      result = _ref.result;

  if (console && console.log) {
    console.log('%c Prev state', 'color: rgba(0,0,0, .65) ; font-weight: 600;', state);

    console.log('%c Action: ', 'color: #70b8ff ; font-weight: 600;', type);

    console.log('%c Next state', 'color: #00C642 ; font-weight: 600;', result);
  }
};

/*
* @param root is globalConfig root
* @param type is actions or state
* @returns {initial} is Object all state or actions
*/
export var getInitial = function getInitial(root, type) {

  if ((typeof root === 'undefined' ? 'undefined' : _typeof(root)) !== 'object' || !root) return {};

  var initial = {};

  Object.keys(root).forEach(function (k) {
    return initial = Object.assign({}, initial, _defineProperty({}, k, Object.assign(Object.assign({}, root[k][type]))));
  });

  return initial;
};
/*
* @param {value} to check is function or not
* @returns {boolean}
*/
export const isFunc = value => value && typeof value === 'function'

/*
* @param {message} to console error in develop tools
*/
export const consoleError = message => console && console.error && console.error(message)

/*
* @param {type, state, result} is type of actions, prev state, and result after dispatch actions
*/
export const logger = ({type, state, result}) => {
  if(console && console.log){
    console.log('%c Prev state', 'color: rgba(0,0,0, .65) ; font-weight: 600;', state )

    console.log('%c Action: ', 'color: #70b8ff ; font-weight: 600;' ,type)

    console.log('%c Next state', 'color: #00C642 ; font-weight: 600;' , result)

  }
}


/*
* @param root is globalConfig root
* @param type is actions or state
* @returns {initial} is Object all state or actions
*/
export const getInitial = (root, type) => {

  if(typeof root !== 'object' || !root) return {}

  let initial = {}

  Object.keys(root)
  .forEach(k =>
    initial =
    {...initial,
      [k]: {...{...root[k][type]}}
    })

    return initial
}

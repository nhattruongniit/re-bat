export const logger = ({type, state, result}) => {
  if(console && console.log){
    console.log('%c Prev state', 'color: rgba(0,0,0, .65) ; font-weight: 600;', state )

    console.log('%c Action: ', 'color: #70b8ff ; font-weight: 600;' ,type)

    console.log('%c Next state', 'color: #00C642 ; font-weight: 600;' , result.then ? result.then(r => r) : result)

  }
}

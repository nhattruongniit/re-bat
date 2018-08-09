// @flow
import * as React from 'react';


const connected = Component => {

  const displayName = `Connect(${Component.displayName || Component.name || 'Unknow'})`

  class ConnectComponent extends React.Component<{}>{
    constructor(props){
      super(props);

      this.state = {
        isUpdate: false
      }
    }
    render(){
       return React.createElement(Component, {...this.props})
    }
  }

  ConnectComponent.displayName = displayName

  return ConnectComponent

}

export default connected

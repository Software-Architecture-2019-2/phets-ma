import React, { Component } from "react";

import ChatScreen from "./ChatInitialScreen"

class ChatInitialComponent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  render(){
    return(
      <ChatScreen 
       changeToBack = {() => this.changeToBack()}
      />
    )
  }
}

export default ChatInitialComponent;
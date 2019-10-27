import React, { Component } from "react";

import ChatScreen from "./ChatScreen"

class ChatComponent extends Component{
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

export default ChatComponent;
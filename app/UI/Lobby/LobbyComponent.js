import React, { Component } from "react";

import LobbyScreen from "./LobbyScreen"

class LobbyComponent extends Component{
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
      <LobbyScreen 
       changeToBack = {() => this.changeToBack()}
      />
    )
  }
}

export default LobbyComponent;
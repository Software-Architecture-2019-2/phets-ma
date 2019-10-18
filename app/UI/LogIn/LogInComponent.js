import React, { Component } from "react";

import LogInScreen from "./LoginScreen"

class LogInComponent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  changeToLobby(){
    this.props.navigation.navigate("MainStack");
  }

  chageToSignIn(){
    this.props.navigation.navigate("SignInView");
  }

  render(){
    return(
      <LogInScreen 
       changeToLobby = {() => this.changeToLobby()}
       chageToSignIn = {() => this.chageToSignIn()}
      />
    )
  }
}

export default LogInComponent;
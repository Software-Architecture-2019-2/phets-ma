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

  changeToSignUp(){
    this.props.navigation.navigate("SignUpView");
  }

  render(){
    return(
      <LogInScreen 
       changeToLobby = {() => this.changeToLobby()}
       changeToSignUp = {() => this.changeToSignUp()}
      />
    )
  }
}

export default LogInComponent;
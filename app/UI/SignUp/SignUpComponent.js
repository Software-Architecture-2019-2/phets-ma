import React, { Component } from "react";

import SignUpScreen from "./SignUpScreen"

class SignUpComponent extends Component{
  constructor(props){
    super(props);
    this.state={

    }
  }

  changeToLobby(){
    this.props.navigation.navigate("MainStack");
  }

  chageToLogIn(){
    this.props.navigation.navigate("LogInView");
  }

  render(){
    return(
      <SignUpScreen 
        changeToLobby = {() => this.changeToLobby()}
        chageToLogIn = {() => this.chageToLogIn()}
      />
    )
  }
}

export default SignUpComponent;
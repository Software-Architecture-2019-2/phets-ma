import React, { Component } from "react";

import SignInScreen from "./SignInScreen"

class SignInComponent extends Component{
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
      <SignInScreen 
        changeToLobby = {() => this.changeToLobby()}
        chageToLogIn = {() => this.chageToLogIn()}
      />
    )
  }
}

export default SignInComponent;
import React, { Component } from "react";

import SignUpScreen from "./SignUpScreen";
import { registerService } from "../../services/UserServices";

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

  async tryRegister(user){
    var response = await registerService(user);
    console.log(response);
    if(response != null){
      var credentials = {username: user.username, password: user.password};
      var token = await loginService(credentials);
      if(token != null){
        this.changeToLobby();
      }
    }
  }

  render(){
    return(
      <SignUpScreen 
        tryRegister = {(user) => this.tryRegister(user)}
        chageToLogIn = {() => this.chageToLogIn()}
      />
    )
  }
}

export default SignUpComponent;
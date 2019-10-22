import React, { Component } from "react";

import { loginService } from "../../services/UserServices";
import LogInScreen from "./LoginScreen"
import login from "../../services/UserServices";

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

  async tryLogin(user){
    var response = await loginService(user);
    console.log(response);
  }

  render(){
    return(
      <LogInScreen 
       tryLogin = {(user) => this.tryLogin(user)}
       changeToSignUp = {() => this.changeToSignUp()}
      />
    )
  }
}

export default LogInComponent;
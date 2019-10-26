import React, { Component } from "react";

import SignUpScreen from "./SignUpScreen";
import { registerService } from "../../services/UserServices";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions/UserActions";
import { loginService } from "../../services/UserServices";

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
    const { dispatch } = this.props;
    dispatch(userActions.register_request(user));

    registerService(user).then(
      response => {
          console.log(response);
          const user = response.register;
          dispatch(userActions.register(true, user, null));
          this.chageToLogIn();
      },
      error => {
          console.log("ERROR: " + error);
          dispatch(userActions.register(false, null, null));
      }
    );
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

function mapStateToProps(state) {
  const user = state.user;
  return {
    user
  };
}

const connectedSignUpComponent = connect(mapStateToProps)(SignUpComponent);
export default connectedSignUpComponent;
import React, { Component } from "react";
import { loginService } from "../../services/UserServices";
import LogInScreen from "./LoginScreen"
// import login from "../../services/UserServices";
import { connect } from "react-redux";
import { userActions } from "../../redux/actions/UserActions";

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
    const { dispatch } = this.props;
    dispatch(userActions.login_request(user));

    loginService(user).then(
      response => {
          console.log(response);
          const user = {
              token: response
          };
          dispatch(userActions.login(true, user, null));
          console.log(this.props.user);
          this.changeToLobby();
      },
      error => {
          console.log("ERROR: " + error);
          dispatch(userActions.login(false, null, null));
      }
    );
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

function mapStateToProps(state) {
  const user = state.user;
  return {
    user
  };
}
const connectedLoginComponent = connect(mapStateToProps)(LogInComponent);
export default connectedLoginComponent;
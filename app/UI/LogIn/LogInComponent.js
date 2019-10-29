import React, { Component } from "react";
import { loginService } from "../../services/UserServices";
import LogInScreen from "./LoginScreen"
// import login from "../../services/UserServices";
import { getUserByUsernameService } from '../../services/UserServices';
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

  async tryLogin(usr){
    const { dispatch } = this.props;
    dispatch(userActions.login_request(usr));

    loginService(usr).then(
      response => {
          getUserByUsernameService(usr.username, (data) => {
            const user = data;
            user.token = response;
            dispatch(userActions.login(true, user, null));
            this.changeToLobby();
            console.log("Login Successful");
          });
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
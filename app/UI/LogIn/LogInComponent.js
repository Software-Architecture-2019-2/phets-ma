import React, { Component } from "react";

import { connect } from "react-redux";

import { loginService } from "../../services/UserServices";
import LogInScreen from "./LoginScreen"
import { getUserByUsernameService } from '../../services/UserServices';
import { userActions } from "../../redux/actions/UserActions";

class LogInComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggingIn: false,
    }
  }

  changeToLobby() {
    this.props.navigation.navigate("MainStack");
  }

  changeToSignUp() {
    this.props.navigation.navigate("SignUpView");
  }

  async tryLogin(usr) {
    this.setState({ isLoggingIn: true });
    const { dispatch } = this.props;
    dispatch(userActions.login_request(usr));


    loginService(usr).then(
      response => {
        getUserByUsernameService(usr.username, (data) => {
          const user = data;
          user.token = response;
          dispatch(userActions.login(true, user, null));
          this.setState({ isLoggingIn: false });
          this.changeToLobby();
          return true
        });
      },
      error => {
        this.setState({ isLoggingIn: false });
        console.log("ERROR: " + error);
        dispatch(userActions.login(false, null, null));
        return false
      }
    );
  }

  render() {
    return (
      <LogInScreen
        tryLogin={(user) => this.tryLogin(user)}
        changeToSignUp={() => this.changeToSignUp()}
        isLoggingIn={this.state.isLoggingIn}
      />)
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
import React, { Component } from "react";

import { connect } from "react-redux";

import { loginService } from "../../services/UserServices";
import LogInScreen from "./LoginScreen"
import { getUserByUsernameService, getUserAnimals } from '../../services/UserServices';
import { userActions } from "../../redux/actions/UserActions";
import { phetsActions } from "../../redux/actions/PhetsActions";

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
        });

        getUserAnimals(usr.username, (animals) => {
          const phets = animals ? animals.filter(animal => { return !animal.adoption }) : [];
          phets.sort(this._sortAnimalList);
          const adoption = animals ? animals.filter(animal => { return animal.adoption }) : [];
          adoption.sort(this._sortAnimalList);
    
          dispatch(phetsActions.setPhetsList(phets));
        });

        return true;
      },
      error => {
        this.setState({ isLoggingIn: false });
        console.log("ERROR: " + error);
        dispatch(userActions.login(false, null, null));
        return false
      }
    );
  }

  _sortAnimalList = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
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
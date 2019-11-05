import React, { Component } from "react";

import SignUpInitialScreen from "./SignUpInitialScreen";
import Spinner from 'react-native-loading-spinner-overlay';
import { strings } from './SignUpStrings';
import {
  getAllCountriesService
} from '../../services/UserServices'

class SignUpInitialComponent extends Component{
  constructor(props){
    super(props);
    this.state={
      user: {},
      countries: null
    }
  }

  componentDidMount() {
    this.getAllCountries();
  }

  getAllCountries() {
    getAllCountriesService((countries) => {
      this.setState({ countries });
    });
  }


  changeToLobby(){
    this.props.navigation.navigate("MainStack");
  }

  chageToLogIn(){
    this.props.navigation.navigate("LogInView");
  }

  setUser(user){
    this.setState({user: user})
    this.props.navigation.navigate("SignUpAditionalView", {user: user});
  }

  render(){
    if (this.state.countries) {
      return(
        <SignUpInitialScreen 
          chageToLogIn = {() => this.chageToLogIn()}
          setUser = {user => this.setUser(user)}
          countries={this.state.countries}
        />
      )
    }else{
      return <Spinner
        visible={true}
        textContent={strings.loadingLabel}
        animation='slide'
      />
    }
  }
}

export default SignUpInitialComponent;
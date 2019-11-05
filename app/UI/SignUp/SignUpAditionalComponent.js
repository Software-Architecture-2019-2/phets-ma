import React, { Component } from "react";

import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';

import SignUpAditionalScreen from "./SignUpAditionalScreen";
import { uploadFile } from '../../services/FileServices'
import { FILES_MS_URI } from '../../services/utils'
import { strings } from "./SignUpStrings";

class SignUpAditionalComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      countries: null,
      uploadedPhoto: '',
    }
  }

  changeToBack = () => {
    this.props.navigation.popToTop();
  }


  render() {
    return (
      <SignUpAditionalScreen
        changeToBack={this.changeToBack}
        user={this.state.user}
      />
    )
  }
}

function mapStateToProps(state) {
  const user = state.login.user;
  return {
    user
  };
}
const connectedUserEditionComponent = connect(mapStateToProps)(SignUpAditionalComponent);
export default connectedUserEditionComponent;
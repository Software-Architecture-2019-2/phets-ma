import React, { Component } from "react";

import UserProfileScreen from "./UserProfileScreen"

export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  changeToUserEdition() {
    this.props.navigation.navigate("UserEdition");
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <UserProfileScreen
        changeToBack={() => this.changeToBack()}
        changeToUserEdition={() => this.changeToUserEdition()}
      />
    )
  }
}

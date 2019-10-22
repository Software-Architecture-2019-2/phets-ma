import React, { Component } from "react";

import UserEditionScreen from "./UserEditionScreen"

export default class UserEditionComponent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  render(){
    return(
      <UserEditionScreen 
       changeToBack = {() => this.changeToBack()}
      />
    )
  }
}

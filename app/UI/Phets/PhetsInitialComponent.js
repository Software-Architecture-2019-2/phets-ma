import React, { Component } from "react";

import PhetsInitialScreen from "./PhetsInitialView"

class PhetsInitialComponent extends Component{
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
      <PhetsInitialScreen 
       changeToBack = {() => this.changeToBack()}
      />
    )
  }
}

export default  PhetsInitialComponent;
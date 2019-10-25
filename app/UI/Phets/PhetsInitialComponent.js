import React, { Component } from "react";

import PhetsInitialScreen from "./PhetsInitialView"

class PhetsInitialComponent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  onSwiped(type){
    console.log(`on swiped ${type}`)
    
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  render(){
    return(
      <PhetsInitialScreen 
       changeToBack = {() => this.changeToBack()}
       onSwiped = {type => this.onSwiped(type)}
      />
    )
  }
}

export default  PhetsInitialComponent;
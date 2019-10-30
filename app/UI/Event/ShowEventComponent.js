import React, { Component } from "react";

import CreateEventScreen from "./CreateEventScreen"

class CreateEventComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      subject: "",
      description: "",
      date: "",
    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  showEvent(event){
    this.props.navigation.navigate("ShowEvent",{event: event});
    console.log("press")
  } 

  render(){
    return(
      <CreateEventScreen 
       changeToBack = {() => this.changeToBack()}
       showEvent = {event => this.showEvent(event)}
      />
    )
  }
}

export default CreateEventComponent;
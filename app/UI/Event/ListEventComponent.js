import React, { Component } from "react";

import ListEventScreen from "./ListEventScreen"

class ListEventComponent extends Component{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  showEvent(event){
    this.props.navigation.navigate("ShowEvent",{event: event});
    console.log("press")
  }

  createEvent(){
    this.props.navigation.navigate("CreateEvent");
    console.log("press")
  }

  render(){
    return(
      <ListEventScreen 
       changeToBack = {() => this.changeToBack()}
       showEvent = {event => this.showEvent(event)}
       createEvent ={() => this.createEvent()}
      />
    )
  }
}

export default ListEventComponent;
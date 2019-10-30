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

  editEvent(){
    this.props.navigation.navigate("CreateEvent",{edit: true});
    console.log("press")
  }

  createEvent(){
    this.props.navigation.navigate("CreateEvent",{edit: false});
    console.log("press")
  }

  render(){
    return(
      <ListEventScreen 
       changeToBack = {() => this.changeToBack()}
       editEvent = {() => this.editEvent()}
       createEvent ={() => this.createEvent()}
      />
    )
  }
}

export default ListEventComponent;
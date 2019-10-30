import React, { Component } from "react";

import CreateEventScreen from "./CreateEventScreen"

class CreateEventComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      id: "",
      subject: "",
      description: "",
      date: "",
      animal_id: "",
      created_at: "",
      updated_at: "",
      editar: this.props.navigation.state.params.edit
    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  getType(){
    return this.state.editar;
  }

  render(){
    return(
      <CreateEventScreen 
       changeToBack = {() => this.changeToBack()}
       showEvent = {event => this.showEvent(event)}
       getType = {() => this.getType()}
      />
    )
  }
}

export default CreateEventComponent;
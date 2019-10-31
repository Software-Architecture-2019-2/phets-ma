import React, { Component } from "react";

import CreateEventScreen from "./CreateEventScreen"
import { connect } from "react-redux";
import {
  createEventService,
  editEventService,
  removeEventService
} from '../../services/EventsServices'

class CreateEventComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      subject: "",
      description: "",
      date: "",
      animal_id: "",
      created_at: "",
      updated_at: "",
      editar: this.props.navigation.state.params.edit,
      animal: this.props.navigation.state.params.animal,
      event:  this.props.navigation.state.params.event,
    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  getType(){
    return this.state.editar;
  }

  setSubject(subject){
    this.setState({subject: subject})
  }

  setDescription(description){
    this.setState({description: description})
  }

  setDate(date){
    this.setState({date: date})
  }

  createEvent(){
    if(!this.state.editar){
      const event = {
        animal_id: this.state.animal.id,
        subject: this.state.subject,
        description: this.state.description,
        date: this.state.date
      }
      
      createEventService(event, (_) => {
        this.props.navigation.navigate("ListEvent");
      });
    }
  }

  editEvent(){
    if(this.state.editar){
      const event = {
        animal_id: this.state.animal.id,
        subject: this.state.subject,
        description: this.state.description,
        date: this.state.date
      }
      editEventService(this.state.event.id, event, (_) => {
        this.props.navigation.navigate("ListEvent");
      });
    }
  }

  removeEvent(){
    if(this.state.editar){
      removeEventService(this.state.event.id, (_) => {
        this.props.navigation.navigate("ListEvent");
      });
    }
  }

  render(){
    return(
      <CreateEventScreen 
       changeToBack = {() => this.changeToBack()}
       getType = {() => this.getType()}
       setSubject = {subject => this.setSubject(subject)}
       setDescription = {description => this.setDescription(description)}
       setDate = {date => this.setDate(date)}
       createEvent = {() => this.createEvent()}
       editEvent = {() => this.editEvent()}
       removeEvent = {() => this.removeEvent()}
      />
    )
  }
}

export default CreateEventComponent;
import React, { Component } from "react";

import ListEventScreen from "./ListEventScreen"
import Spinner from 'react-native-loading-spinner-overlay';

import { getAllEvents } from '../../services/EventsServices'
import { AnimalFormStrings } from "../AnimalForm/AnimalFormStrings";

class ListEventComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      animal: this.props.navigation.state.params.animal,
      events: null,
      eventsAnimal: null
    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  editEvent(event){
    this.props.navigation.navigate("CreateEvent",{edit: true, animal: this.state.animal, event: event});
    
  }

  createEvent(){
    this.props.navigation.navigate("CreateEvent",{edit: false, animal: this.state.animal, event: null});
    console.log("press")
  }

  getEventsAnimal(){
    return this.state.events
  }

  componentDidMount() {
    this._loadAsyncData();
    this._registerDidFocusListener()
    this.getEvents();
  }

  _registerDidFocusListener() {
    this.props.navigation.addListener(
      'didFocus',
      () => this._loadAsyncData()
    );
  }

  _loadAsyncData() {
    this.getEvents();
  }

  getAnimal(){
    return this.state.animal
  }

  getEvents() {
    getAllEvents((events) => {
      this.setState({ events: events });
    });
  }

  render(){
  if (this.state.events != null) {
    return(
      <ListEventScreen 
       changeToBack = {() => this.changeToBack()}
       editEvent = {event => this.editEvent(event)}
       createEvent = {() => this.createEvent()}
       getEventsAnimal = {() => this.getEventsAnimal()}
       getAnimal = {() => this.getAnimal()}
      />
    )
  } else {
    return <Spinner
      visible={true}
      textContent={AnimalFormStrings.loadingLabel}
      animation='slide'
    />
  }
  }
}

export default ListEventComponent;
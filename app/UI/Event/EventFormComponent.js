import React, { Component } from "react";

import EventFormScreen from "./EventFormScreen"
import {
  createEventService,
  editEventService,
  removeEventService
} from '../../services/EventsServices'

class EventFormComponent extends Component {
  constructor(props) {
    super(props);
    this.isEdit = this.props.navigation.state.params.edit;
    this.animal = this.props.navigation.state.params.animal;
    this.event = this.props.navigation.state.params.event;
    this.state = {
    }
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  formType() {
    return this.state.edit;
  }

  createEvent = (eventToCreate) => {
    if (!this.isEdit) {
      eventToCreate.animal_id = this.animal.id;
      createEventService(eventToCreate, (_) => {
        this.props.navigation.navigate("ListEvent");
      });
    }
  }

  editEvent = (eventToEdit) => {
    if (this.isEdit) {
      eventToEdit.animal_id = this.animal.id;
      editEventService(this.event.id, eventToEdit, (_) => {
        this.props.navigation.navigate("ListEvent");
      });
    }
  }

  removeEvent = () => {
    if (this.isEdit) {
      removeEventService(this.event.id, (_) => {
        this.props.navigation.navigate("ListEvent");
      });
    }
  }

  render() {
    return (
      <EventFormScreen
        changeToBack={() => this.changeToBack()}
        isEdition={this.isEdit}
        createEvent={this.createEvent}
        editEvent={this.editEvent}
        removeEvent={this.removeEvent}
        handleOnOpenCalendar={this.handleOnOpenCalendar}
        event={this.event}
      />
    )
  }
}

export default EventFormComponent;
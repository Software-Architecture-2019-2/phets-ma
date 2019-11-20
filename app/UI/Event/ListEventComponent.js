import React, { Component } from "react";

import ListEventScreen from "./ListEventScreen";
import { EventsStrings } from './ListEventString';
import { connect } from "react-redux";
import Spinner from 'react-native-loading-spinner-overlay';

import { getAllEventsService } from '../../services/EventsServices'

class ListEventComponent extends Component {
  constructor(props) {
    super(props);
    this.animal = this.props.navigation.state.params.animal,
      this.state = {
        events: null,
        eventsAnimal: null
      }
  }

  componentDidMount() {
    this._loadAsyncData();
    this._registerDidFocusListener()
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  editEvent(event) {
    this.props.navigation.navigate("CreateEvent", { edit: true, animal: this.animal, event: event });
  }

  createEvent() {
    this.props.navigation.navigate("CreateEvent", { edit: false, animal: this.animal, event: null });
  }

  _registerDidFocusListener() {
    this.props.navigation.addListener(
      'didFocus',
      () => this._loadAsyncData()
    );
  }

  _loadAsyncData() {
    this.loadAnimalEvents();
  }

  eventsFilter(event) {
    return event.animal_id === this.animal.id.toString(10) && (new Date(event.date) >= new Date())
  }

  loadAnimalEvents() {
    const { token } =this.props.user.token;
    getAllEventsService(token, (events) => {
      const animalEvents = events.filter(event => this.eventsFilter(event))
      this.setState({ events: animalEvents });
    });
  }

  render() {
    if (this.state.events !== null) {
      return (
        <ListEventScreen
          changeToBack={() => this.changeToBack()}
          editEvent={event => this.editEvent(event)}
          createEvent={() => this.createEvent()}
          events={this.state.events}
        />
      )
    } else {
      return <Spinner
        visible={true}
        textContent={EventsStrings.loadingLabel}
        animation='slide'
      />
    }
  }
}

// export default ListEventComponent;

function mapStateToProps(state) {
  const user = state.login.user;
  const phets = state.setPhetsList.phets;
  const defaultPhet = state;
  return {
    user,
    phets,
    defaultPhet
  };
}
const connectedListEventComponent = connect(mapStateToProps)(ListEventComponent);
export default connectedListEventComponent;
import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import PhetsInitialScreen from "./PhetsInitialView"
import { createInteractionService, isMatchService, getAllPhetsService } from "../../services/InteractionServices";
import { connect } from "react-redux";

class PhetsInitialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: null,
      isMatch: false,
    }
  }

  componentDidMount() {
    this.getAllAnimals();
  }

  getDataAnimals() {
    return this.state.animals
  }

  onSwiped(state, animal) {
    if (!animal || !this.props.user) return;
    createInteractionService({
      // TODO: This ID most be from the current animal given by the storage.
      id1: this.props.user.id,
      id2: animal.id,
      state
    }, (data) => {
      this._checkIfMatch(data.idMain, data.idSecondary)
    });
  }

  _checkIfMatch(id1, id2) {
    isMatchService({ id1, id2 }, (data) => {
      this.setState({ isMatch: true });
      // THis should show something to indicate there is a match and invite to chat.
    })
  }

  getAllAnimals() {
    getAllPhetsService({ animalId: this.props.user.id, username: this.props.user.username }, (animals) => {
      this.setState({ animals });
    });
  }


  changeToBack() {
    this.props.navigation.popToTop();
  }

  render() {
    if (this.state.animals) {
      return (
        <PhetsInitialScreen
          changeToBack={() => this.changeToBack()}
          onSwiped={(state, animal) => this.onSwiped(state, animal)}
          animals={this.state.animals}
          getDataAnimals={() => this.getDataAnimals()}
          isMatch={this.state.isMatch}
        />
      )
    } else {
      return <Spinner
        visible={true}
        textContent={"Loading..."}
        animation='slide'
      />
    }
  }
}

function mapStateToProps(state) {
  const user = state.login.user;
  return {
    user
  };
}
const connectedPhetsInitialComponent = connect(mapStateToProps)(PhetsInitialComponent);
export default connectedPhetsInitialComponent;
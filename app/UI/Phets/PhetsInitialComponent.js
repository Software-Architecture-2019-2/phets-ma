import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import PhetsInitialScreen from "./PhetsInitialView"
import Demo from "./Demo";
import { getAllAnimalsService } from "../../services/AnimalServices";
import { likeService } from "../../services/InteractionServices";
import { connect } from "react-redux";

class PhetsInitialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Se guarda el listado de todos los animales con sus caracteristicas. JSON */
      animals: null,
      animalsData: null,
    }
  }

  componentDidMount() {
    this.getAllAnimals();
  }

  getDataAnimals() {
    return this.state.animals
  }

  onSwiped(state, animal) {
    if(!animal || !this.props.user) return;
    /* Se indica para donde se fue la tarjeta si left or right */
    /* Recuperando el like o dislike */
    var response = likeService(this.props.user.id, animal.id, state);
    console.log(response);
  }

  getAllAnimals() {
    getAllAnimalsService((animals) => {
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
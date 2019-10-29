import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import PhetsInitialScreen from "./PhetsInitialView"
import Demo from "./Demo";
import { getAllAnimalsService } from "../../services/AnimalServices";

class PhetsInitialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      /* Se guarda el listado de todos los animales con sus caracteristicas. JSON */
      animals: null,
      animalsData: null,
    }
  }

<<<<<<< HEAD
  componentDidMount() {
=======
  componentDidMount(){
>>>>>>> master
    this.getAllAnimals();
  }

  getDataAnimals() {
    return this.state.animals
  }

  onSwiped(type) {
    /* Se indica para donde se fue la tarjeta si left or right */
    /* Recuperando el like o dislike */


  }

  getAllAnimals() {
    getAllAnimalsService((animals) => {
<<<<<<< HEAD
      this.setState({ animals });
=======
      this.setState({animals});
>>>>>>> master
    });
  }


  changeToBack() {
    this.props.navigation.popToTop();
  }

  render() {
<<<<<<< HEAD
    if (this.state.animals) {
=======
    if(this.state.animals){
>>>>>>> master
      return (
        <PhetsInitialScreen
          changeToBack={() => this.changeToBack()}
          onSwiped={type => this.onSwiped(type)}
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

export default PhetsInitialComponent;
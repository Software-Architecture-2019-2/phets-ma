import React, { Component } from "react";

import PhetsInitialScreen from "./PhetsInitialView"
import Demo from "./Demo";

class PhetsInitialComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      /* Se guarda el listado de todos los animales con sus caracteristicas. JSON */
      animals: Demo,
    }
  }

  getAnimals(){
    return this.state.animals
  }

  onSwiped(type){
    /* Se indica para donde se fue la tarjeta si left or right */
    /* Recuperando el like o dislike */
    console.log(`on swiped ${type}`)
    console.log(this.state.animals)
    
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  render(){
    return(
      <PhetsInitialScreen 
       changeToBack = {() => this.changeToBack()}
       onSwiped = {type => this.onSwiped(type)}
       getAnimals = {() => this.getAnimals()}
      />
    )
  }
}

export default  PhetsInitialComponent;
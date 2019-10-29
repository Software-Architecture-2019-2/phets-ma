import React, { Component } from "react";

import PhetsInitialScreen from "./PhetsInitialView"
import Demo from "./Demo";
import { getAnimalsService } from "../../services/AnimalServices";
import { uploadFile } from '../../services/FileServices'

class PhetsInitialComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      /* Se guarda el listado de todos los animales con sus caracteristicas. JSON */
      animals: Demo,
      animalsData: null,
    }
  }

  getDataAnimals(){
    return this.state.animals
  }

  onSwiped(type){
    /* Se indica para donde se fue la tarjeta si left or right */
    /* Recuperando el like o dislike */
    
    
  }

  getAllAnimals() {
    getAnimalsService((data) => {
      data.map((data) =>{
        console.log(data.name)
      })
      return data
    });
  }


  changeToBack(){
    this.props.navigation.popToTop();
  }

  render(){
    return(
      <PhetsInitialScreen 
       changeToBack = {() => this.changeToBack()}
       onSwiped = {type => this.onSwiped(type)}
       getAllAnimals = {() => this.getAllAnimals()}
       getDataAnimals = {() => this.getDataAnimals()}
      />
    )
  }
}

export default  PhetsInitialComponent;
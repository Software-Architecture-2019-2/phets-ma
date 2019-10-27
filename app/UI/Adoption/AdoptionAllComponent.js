import React, { Component } from "react";

import AdoptionAllScreen from "./AdoptionAllScreen"
import Demo from "../Phets/Demo"

class AdoptionAllComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      animals: Demo,
      idAdoption: -1,
    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  getAninals(){
    return this.state.animals;
  }

  /*Se recurea el id del cual fue seleccionado*/
  selectAnimalView(id){
    this.setState({
      idAdoption: id
    })
    this.props.navigation.navigate("AdoptionView",{
      id: id
    })
  }

  render(){
    return(
      <AdoptionAllScreen
       changeToBack = {() => this.changeToBack()}
       getAninals = {() => this.getAninals()}
       selectAnimalView = {id => this.selectAnimalView(id)}
      />
    )
  }
}

export default AdoptionAllComponent;
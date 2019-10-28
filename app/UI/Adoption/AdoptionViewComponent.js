import React, { Component } from "react";

import AdoptionViewScreen from "./AdoptionViewScreen"
import Demo from "../Phets/Demo"

class AdoptionViewComponent extends Component{
  constructor(props){
    super(props);
    this.state = {
      animals: Demo,
      idAdoption: -1,
      id: this.props.navigation.state.params.id
    }
  }

  changeToBack(){
    this.props.navigation.popToTop();
  }

  getAninals(){
    for(let i=0; i<this.state.animals.length; i++){
      if(this.state.animals[i].id==this.state.id){
        return this.state.animals[i]
      }
    }
  }

  /*Se recurea el id del cual fue seleccionado*/
  selectAnimalView(id){
    this.setState({
      idAdoption: id
    })
  }

  render(){
    return(
      <AdoptionViewScreen
       changeToBack = {() => this.changeToBack()}
       getAninals = {id => this.getAninals(id)}
       selectAnimalView = {id => this.selectAnimalView(id)}
      />
    )
  }
}

export default AdoptionViewComponent;
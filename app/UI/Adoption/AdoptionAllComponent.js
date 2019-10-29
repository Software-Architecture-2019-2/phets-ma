import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import AdoptionAllScreen from "./AdoptionAllScreen"
import { getAllAnimalsService } from "../../services/AnimalServices";
import { AdoptionStrings } from "./AdoptionStrings";

class AdoptionAllComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: null,
      idAdoption: -1,
    }
  }

  componentDidMount() {
    this.getAllAnimals();
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }
  
  selectAnimalView(id) {
    this.setState({
      idAdoption: id
    })
    this.props.navigation.navigate("AdoptionView", {
      id: id
    })
  }

  getAllAnimals() {
    getAllAnimalsService((animals) => {
      console.log(animals)
      this.setState({ animals });
    });
  }

  render() {
    if (this.state.animals) {
      return (
        <AdoptionAllScreen
          changeToBack={() => this.changeToBack()}
          animals={this.state.animals}
          selectAnimalView={id => this.selectAnimalView(id)}
        />
      )
    } else {
      return <Spinner
        visible={true}
        textContent={AdoptionStrings.loadingLabel}
        animation='slide'
      />
    }
  }
}

export default AdoptionAllComponent;
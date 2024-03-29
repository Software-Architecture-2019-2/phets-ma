import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';
import { connect } from "react-redux";

import AdoptionAllScreen from "./AdoptionAllScreen"
import { getAllAnimalsService } from "../../services/AnimalServices";
import { AdoptionStrings } from "./AdoptionStrings";

class AdoptionAllComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: null,
    }
  }

  componentDidMount() {
    this.getAllAnimals();
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  navigateToAnimalView = (data) => {
    this.props.navigation.navigate("AdoptionView", data);
  }

  getAllAnimals() {
    getAllAnimalsService((animals) => {
      const adoptionAnimals = animals.filter((animal, _) => {
        return animal.adoption && animal.user != this.props.user.username;
      })
      this.setState({ animals: adoptionAnimals });
    });
  }

  render() {
    if (this.state.animals) {
      return (
        <AdoptionAllScreen
          changeToBack={() => this.changeToBack()}
          animals={this.state.animals}
          navigateToAdoptionView={this.navigateToAnimalView}
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

function mapStateToProps(state) {
  const user = state.login.user;
  return {
    user
  };
}
const connectedAdoptionAllComponent = connect(mapStateToProps)(AdoptionAllComponent);
export default connectedAdoptionAllComponent;
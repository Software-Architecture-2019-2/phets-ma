import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import AnimalViewScreen from "./AnimalViewScreen"
import { AnimalStrings } from "./AnimalViewStrings";

class AnimalViewComponent extends Component {
  constructor(props) {
    super(props);
    this.animal = this.props.navigation.state.params.animal;
    this.showEdit = this.props.navigation.state.params.showEdit;
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  navigateToEdit = () => {
    this.props.navigation.navigate("EditAnimal", { animal: this.animal, editionForm: true });
  }

  navigateToListEvents(){
    this.props.navigation.navigate("ListEvent", {animal: this.animal});
  }

  render() {
    return <AnimalViewScreen
      changeToBack={() => this.changeToBack()}
      navigateToEdit={this.navigateToEdit}
      animal={this.animal}
      showEditButton={this.showEdit}
      navigateToListEvents={() => this.navigateToListEvents()}
    />
  }
}

export default AnimalViewComponent;
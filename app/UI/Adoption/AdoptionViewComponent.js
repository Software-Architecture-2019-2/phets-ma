import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import AdoptionViewScreen from "./AdoptionViewScreen"
import { getAnimalByIDService } from "../../services/AnimalServices";
import { AdoptionStrings } from "./AdoptionStrings";

class AdoptionViewComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animal: null,
    }
    this.animalId = this.props.navigation.state.params.id;
  }

  componentDidMount(){
    this._getAnimalById();
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  _getAnimalById() {
    getAnimalByIDService(this.animalId, (animal) => {
      this.setState({animal});
    });
  }

  render() {
    if (this.state.animal) {
      return <AdoptionViewScreen
        changeToBack={() => this.changeToBack()}
        animal={this.state.animal}
      />
    } else {
      return <Spinner
        visible={true}
        textContent={AdoptionStrings.loadingLabel}
        animation='slide'
      />
    }
  }
}

export default AdoptionViewComponent;
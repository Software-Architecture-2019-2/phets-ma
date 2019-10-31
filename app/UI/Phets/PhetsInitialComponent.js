import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import PhetsInitialScreen from "./PhetsInitialView"
import { createInteractionService, isMatchService, getAllPhetsService } from "../../services/InteractionServices";
import { connect } from "react-redux";
import { phetsActions } from "../../redux/actions/PhetsActions";

class PhetsInitialComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: null,
      isMatch: false,
      selectedPhet: this.props.phets[0]
    }
  }

  componentDidMount() {
    this.getAllAnimals();

    this.selectDefaultPhet(this.props.phets[0]);
  }

  getDataAnimals() {
    return this.state.animals
  }

  onSwiped(state, animal) {

    if (!animal || !this.props.user) return;
    createInteractionService({
      id1: this.state.selectedPhet.id,
      id2: animal.id,
      state
    }, (data) => {
      this._checkIfMatch(data.idMain, data.idSecondary)
    });
  }

  _checkIfMatch(id1, id2) {
    isMatchService({ id1, id2 }, (data) => {
      this.setState({ isMatch: true });
      // This should show something to indicate there is a match and invite to chat.
    })
  }

  getAllAnimals() {
    getAllPhetsService({ animalId: this.state.selectedPhet.id, username: this.props.user.username }, (animals) => {
      var filteredAnimals = animals.filter((animal) => 
        (animal.animal_type.id == this.state.selectedPhet.animal_type.id)
        && (animal.gender != this.state.selectedPhet.gender)
        && !animal.adoption
      );
      this.setState({ animals: filteredAnimals });
    });
  }

  selectDefaultPhet(animal){
    this.setState({animals: null});
    const { dispatch } = this.props;
    dispatch(phetsActions.setDefaultPhet(animal));
    
    this.setState({
      selectedPhet: animal
    }, this.getAllAnimals());
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
          phets={this.props.phets}
          defaultPhet={this.state.selectedPhet} 
          selectDefaultPhet={(animalName) => this.selectDefaultPhet(animalName)}
          getDataAnimals={() => this.getDataAnimals()}
          isMatch={this.state.isMatch}
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
  const phets = state.setPhetsList.phets;
  const defaultPhet = state;
  return {
    user,
    phets,
    defaultPhet
  };
}
const connectedPhetsInitialComponent = connect(mapStateToProps)(PhetsInitialComponent);
export default connectedPhetsInitialComponent;
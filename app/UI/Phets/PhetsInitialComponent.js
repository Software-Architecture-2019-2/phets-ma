import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import PhetsInitialScreen from "./PhetsInitialView"
import { createInteractionService, isMatchService, getAllPhetsService } from "../../services/InteractionServices";
import { connect } from "react-redux";
import { phetsActions } from "../../redux/actions/PhetsActions";
import { strings } from "./PhetsStrings";
import { Alert } from "react-native";

class PhetsInitialComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      animals: null,
      isMatch: false,
      empty: this.props.phets.length == 0,
      phets: this.props.phets,
      selectedPhet: this.props.phets.length != 0 ? this.props.phets[0] : null
    }
  }

  componentDidMount() {
    if(!this.state.selectedPhet){
      return;
    }
    this.getAllAnimals();
    this.selectDefaultPhet(this.state.phets[0]);
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
      const newAnimalsList = this.state.animals;
      newAnimalsList.filter((anim) => animal.id != anim.id);
      this.setState({animals: newAnimalsList});
      this._checkIfMatch(data.idMain, data.idSecondary, animal)
    });
  }

  _checkIfMatch(id1, id2, animal) {
    isMatchService({ id1, id2 }, (data) => {
      if(data.state == true){
        this.setState({ isMatch: true });
        Alert.alert(
          strings.match,
          (strings.you_matched + " " + animal.name),
          [
            {
              text: strings.close,
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: strings.chat, onPress: () => console.log('Chat Pressed')},
          ],
          {cancelable: true},
        )
      }
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

  closeModal(){

  }

  startChat(){

  }

  render() {
    if (this.state.animals) {
      return (
        <PhetsInitialScreen
          changeToBack={() => this.changeToBack()}
          onSwiped={(state, animal) => this.onSwiped(state, animal)}
          animals={this.state.animals}
          phets={this.state.phets}
          defaultPhet={this.state.selectedPhet} 
          selectDefaultPhet={(animalName) => this.selectDefaultPhet(animalName)}
          getDataAnimals={() => this.getDataAnimals()}
          isMatch={this.state.isMatch}
          matchedAnimal={this.state.matchedAnimal}
          closeModal={() => this.closeModal()}
          startChat={() => this.startChat()}
        />
      )
    } 
    else if(this.state.phets.length == 0){
      return (
        <PhetsInitialScreen
          changeToBack={() => this.changeToBack()}
          onSwiped={(state, animal) => this.onSwiped(state, animal)}
          animals={this.state.animals}
          phets={this.state.phets}
          defaultPhet={this.state.selectedPhet} 
          selectDefaultPhet={(animalName) => this.selectDefaultPhet(animalName)}
          getDataAnimals={() => this.getDataAnimals()}
          isMatch={this.state.isMatch}
          matchedAnimal={this.state.matchedAnimal}
          closeModal={() => this.closeModal()}
          startChat={() => this.startChat()}
        />
      )
    }
    else {
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
import React, { Component } from "react";

import { Alert } from 'react-native'
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { connect } from "react-redux";

import AnimalFormScreen from "./AnimalFormScreen";
import { AnimalFormStrings } from "./AnimalFormStrings";
import {
  createAnimalService,
  getAllAnimalTypesService,
  updateAnimalService,
  deleteAnimalService
} from '../../services/AnimalServices'
import { uploadFile } from '../../services/FileServices'

class AnimalFormComponent extends Component {
  constructor(props) {
    super(props);
    this.isEditionForm = this.props.navigation.getParam('editionForm', false);
    this.animalToEdit = this.props.navigation.getParam('animal', {});
    this.state = {
      animalTypes: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const isEditionForm = navigation.getParam('editionForm', false);
    return {
      title: isEditionForm ? AnimalFormStrings.editAnimal : AnimalFormStrings.createAnimal,
      headerRight: this.deleteAnimalHeaderButton(navigation),
    };
  };

  static deleteAnimalHeaderButton(navigation) {
    const isEditionForm = navigation.getParam('editionForm', false);
    if (isEditionForm) {
      return <Button buttonStyle={{ width: 30 }}
        icon={
          <FontAwesomeIcon icon={faTrashAlt} size={30} color={"#77A6F7"} />
        }
        type="clear"
        onPress={() => this.handleOnDelete(navigation)}
      />
    }
    return null;
  }

  static handleOnDelete = (navigation) => {
    Alert.alert(
      AnimalFormStrings.deleteAnimal,
      AnimalFormStrings.deleteAnimalMessage,
      [
        {
          text: AnimalFormStrings.cancel,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: AnimalFormStrings.confirmDelete, onPress: () => this.deleteAnimal(navigation) },
      ],
      { cancelable: false },
    );
  }

  static deleteAnimal = (navigation) => {
    const {token} = this.props.user;
    const animal = navigation.getParam('animal', {});
    deleteAnimalService(animal.id, token, (_) => {
      this.props.navigation.navigate('Profile');
    })
  }

  componentDidMount() {
    this.getAllAnimalTypes();
  }

  getAllAnimalTypes() {
    getAllAnimalTypesService(this.props.user.token, (types) => {
      this.setState({ animalTypes: types });
    });
  }

  createAnimal = (animal) => {
    animal.user = this.props.user.username;
    createAnimalService(animal, this.props.user.token, (_) => {
      this.navigateToProfile();
    });
  }

  updateAnimal = (id, animal) => {
    const {token} = this.props.user;
    updateAnimalService(id, animal, token, (_) => {
      this.navigateToProfile();
    });
  }

  navigateToProfile() {
    this.props.navigation.navigate('Profile');
  }

  changeToBack = () => {
    this.props.navigation.popToTop();
  }

  uploadPhoto = async (photo) => {
    return await uploadFile(photo, this.props.user.token);
  }

  render() {
    if (this.state.animalTypes) {
      return (
        <AnimalFormScreen
          changeToBack={this.changeToBack}
          isEditionForm={this.isEditionForm}
          animalToEdit={this.animalToEdit}
          createAnimal={this.createAnimal}
          updateAnimal={this.updateAnimal}
          animalTypes={this.state.animalTypes}
          uploadPhoto={this.uploadPhoto}
        />
      )
    } else {
      return <Spinner
        visible={true}
        textContent={AnimalFormStrings.loadingLabel}
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
const connectedAnimalFormComponent = connect(mapStateToProps)(AnimalFormComponent);
export default connectedAnimalFormComponent;
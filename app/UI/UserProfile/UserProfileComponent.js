import React, { Component } from "react";

import { Text, View } from 'react-native'
import UserProfileScreen from "./UserProfileScreen"
import { getUserByUsernameService, getUserAnimals } from '../../services/UserServices';
import { FILES_MS_URI } from '../../services/utils';

export default class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      animals: null
    }
    this.getPhotoUri = this.getPhotoUri.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getUserAnimals();
  }

  changeToUserEdition() {
    this.props.navigation.navigate("UserEdition");
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  getUser() {
    getUserByUsernameService("crdgonzalezca", (data) => {
      this.setState({ user: data });
    });
  }

  getUserAnimals() {
    getUserAnimals("crdgonzalezca", (animals) => {
      const phets = animals ? animals.filter(animal => { return !animal.adoption }) : [];
      const adoption = animals ? animals.filter(animal => { return animal.adoption }) : [];
      this.setState({ animals: { phets, adoption } });
    });
  }

  getPhotoUri() {
    const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
    return this.state.user.media ? `${FILES_MS_URI}/${this.state.user.media}` : defaultImage;
  }

  render() {
    if (this.state.user && this.state.animals) {
      return (
        <UserProfileScreen
          changeToBack={() => this.changeToBack()}
          changeToUserEdition={() => this.changeToUserEdition()}
          user={this.state.user}
          photoUri={this.getPhotoUri}
          phets={this.state.animals.phets}
          adoption={this.state.animals.adoption}
        />
      )
    } else {
      return (
        <View>
          <Text>Loading...</Text>
        </View>)
    }
  }
}

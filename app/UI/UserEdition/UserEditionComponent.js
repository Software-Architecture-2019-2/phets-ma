import React, { Component } from "react";
import { Text, View } from 'react-native';

import UserEditionScreen from "./UserEditionScreen";
import { getUserByUsernameService, getAllCountriesService, updateUserService } from '../../services/UserServices'
import { uploadFile } from '../../services/FileServices'
import { FILES_MS_URI } from '../../services/utils'

export default class UserEditionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      countries: null,
      uploadedPhoto: ''
    }
  }

  componentDidMount() {
    this.getAllCountries();
    this.getUser();
  }

  getUser() {
    getUserByUsernameService("crdgonzalezca", (data) => {
      this.setState({ user: data });
    });
  }

  getAllCountries() {
    getAllCountriesService((countries) => {
      this.setState({ countries });
    });
  }

  updateUser = (user) => {
    updateUserService(user, (updatedUser) => {
      this.setState({ user: updatedUser })
      this.props.navigation.navigate('Profile');
    });
  }

  getPhotoUri() {
    const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
    return this.state.user.media ? `${FILES_MS_URI}/${this.state.user.media}` : defaultImage;
  }

  changeToBack = () => {
    this.props.navigation.popToTop();
  }

  uploadPhoto = async (photo) => {
    return await uploadFile(photo);
  }

  render() {
    if (this.state.countries && this.state.user) {
      return (
        <UserEditionScreen
          changeToBack={this.changeToBack}
          user={this.state.user}
          photoUri={this.getPhotoUri()}
          updateUser={this.updateUser}
          countries={this.state.countries}
          uploadPhoto={this.uploadPhoto}
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

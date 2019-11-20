import React, { Component } from "react";

import { connect } from "react-redux";
import { Alert } from 'react-native'
import { Button } from 'react-native-elements';
import Spinner from 'react-native-loading-spinner-overlay';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import UserEditionScreen from "./UserEditionScreen";
import {
  getUserByUsernameService,
  getAllCountriesService,
  updateUserService
} from '../../services/UserServices'
import { uploadFile } from '../../services/FileServices'
import { FILES_MS_URI } from '../../services/utils'
import { UserEditionStrings } from "./UserEditionStrings";

class UserEditionComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      countries: null,
      uploadedPhoto: '',
    }
  }

  static navigationOptions = {
    title: UserEditionStrings.editProfile,
    headerRight: <Button buttonStyle={{ width: 30 }}
      icon={
        <FontAwesomeIcon icon={faTrashAlt} size={30} color={"#77A6F7"} />
      }
      type="clear"
      onPress={() => this.handleOnDelete()}
    />
  }

  static handleOnDelete = () => {
    Alert.alert(
      UserEditionStrings.deleteAccount,
      UserEditionStrings.deleteAccountMessage,
      [
        {
          text: UserEditionStrings.cancelDelete,
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: UserEditionStrings.confirmDelete, onPress: () => console.log('Account deleted') },
      ],
      { cancelable: false },
    );
  }

  componentDidMount() {
    this.getAllCountries();
    this.getUser();
  }

  getUser() {
    getUserByUsernameService(this.props.user, (data) => {
      this.setState({ user: data });
    });
  }

  getAllCountries() {
    getAllCountriesService(this.props.user.token, (countries) => {
      this.setState({ countries });
    });
  }

  updateUser = (user) => {
    updateUserService(user, this.props.user.token, (updatedUser) => {
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
    return await uploadFile(photo, this.props.user.token);
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
      return <Spinner
        visible={true}
        textContent={UserEditionStrings.loadingLabel}
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
const connectedUserEditionComponent = connect(mapStateToProps)(UserEditionComponent);
export default connectedUserEditionComponent;
import React, { Component } from "react";
import Spinner from 'react-native-loading-spinner-overlay';

import UserProfileScreen from "./UserProfileScreen"
import { getUserByUsernameService, getUserAnimals } from '../../services/UserServices';
import { FILES_MS_URI } from '../../services/utils';
import { UserProfileStrings } from "./UserProfileStrings";
import { connect } from "react-redux";

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      animals: null
    }
  }

  componentDidMount() {
    this._loadAsyncData();
    this._registerDidFocusListener()
  }

  changeToUserEdition() {
    this.props.navigation.navigate("UserEdition");
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  _registerDidFocusListener() {
    this.props.navigation.addListener(
      'didFocus',
      () => this._loadAsyncData()
    );
  }

  _loadAsyncData() {
    this.setState({ user: null, animals: null });
    this.getUser();
    this.getUserAnimals();
  }

  getUser() {
    getUserByUsernameService(this.props.user.username, (data) => {
      this.setState({ user: data });
    });
  }

  getUserAnimals() {
    console.log("USER IS");
    console.log(this.props.user.username);
    getUserAnimals(this.props.user.username, (animals) => {
      const phets = animals ? animals.filter(animal => { return !animal.adoption }) : [];
      const adoption = animals ? animals.filter(animal => { return animal.adoption }) : [];
      this.setState({ animals: { phets, adoption } });
    });
  }

  getPhotoUri = () => {
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
      return <Spinner
        visible={true}
        textContent={UserProfileStrings.loadingLabel}
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
const connectedUserComponent = connect(mapStateToProps)(UserComponent);
export default connectedUserComponent;
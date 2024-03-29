import React, { Component } from "react";
import Spinner from 'react-native-loading-spinner-overlay';

import { BackHandler } from "react-native";
import { connect } from "react-redux";
import UserProfileScreen from "./UserProfileScreen"
import { FILES_MS_URI } from '../../services/utils';
import { UserProfileStrings } from "./UserProfileStrings";
import { phetsActions } from "../../redux/actions/PhetsActions";
import { userActions } from "../../redux/actions/UserActions";
import { getUserByUsernameService, getUserAnimals } from '../../services/UserServices';

class UserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      animals: null
    }
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this._loadAsyncData();
    this._registerDidFocusListener()
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
    this.props.navigation.navigate('MainStack');
    return true;
  };

  changeToUserEdition() {
    this.props.navigation.navigate("UserEdition");
  }

  logout(){
    console.log("Logout");
    const { dispatch } = this.props;
    dispatch(userActions.logout());
    dispatch(phetsActions.deletePhetsList());
    dispatch(phetsActions.deleteDefaultPhet());
    this.props.navigation.popToTop();
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  navigateToAnimalView = (params) => {
    this.props.navigation.navigate("Animal", params);
  }

  navigateToCreateAnimal = (params) => {
    this.props.navigation.navigate("CreateAnimal", params);
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

  _sortAnimalList = (a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }

  getUserAnimals() {
    getUserAnimals(this.props.user.username, (animals) => {
      const phets = animals ? animals.filter(animal => { return !animal.adoption }) : [];
      phets.sort(this._sortAnimalList);
      const adoption = animals ? animals.filter(animal => { return animal.adoption }) : [];
      adoption.sort(this._sortAnimalList);
      this.setState({ animals: { phets, adoption } });

      const { dispatch } = this.props;
      dispatch(phetsActions.setPhetsList(phets));
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
          logout={() => this.logout()}
          changeToUserEdition={() => this.changeToUserEdition()}
          navigateToAnimalView={this.navigateToAnimalView}
          navigateToCreateAnimal={this.navigateToCreateAnimal}
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
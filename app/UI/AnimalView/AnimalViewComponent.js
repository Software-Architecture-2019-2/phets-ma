import React, { Component } from "react";

import Spinner from 'react-native-loading-spinner-overlay';

import AnimalViewScreen from "./AnimalViewScreen"
import { AnimalStrings } from "./AnimalViewStrings";
import { createMessageService } from "../../services/ChatServices";
import { FILES_MS_URI } from "../../services/utils";

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

  navigateToListEvents = () => {
    this.props.navigation.navigate("ListEvent");
  }

  getImageUri(media) {
    const defaultImage = 'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png';
    return media && media.length ? `${FILES_MS_URI}\\${media[0]}` : defaultImage;
  }

  submitMessageAndNavigate = (text) => {
    createMessageService({
      sent: this.props.user.username,
      received: this.animal.id,
      content: text,
      adopt: true,
    }, (_) => {
      console.log("asdasd")
      // this.props.navigation.navigate("ChatView", {
      //   from: {id: this.props.user.username, username: this.props.user.username},
      //   to: this.animal.id,
      //   name: this.animal.name,
      //   image: this.getImageUri(this.animal.media)
      // })
    });
  }

  render() {
    return <AnimalViewScreen
      changeToBack={() => this.changeToBack()}
      navigateToEdit={this.navigateToEdit}
      animal={this.animal}
      showEditButton={this.showEdit}
      navigateToListEvents={this.navigateToListEvents}
      submitMessageAndNavigate={this.submitMessageAndNavigate}
    />
  }
}

export default AnimalViewComponent;
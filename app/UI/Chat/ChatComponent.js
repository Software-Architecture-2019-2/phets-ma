import React, { Component } from "react";

import firestore from '@react-native-firebase/firestore';

import ChatScreen from "./ChatScreen"

class ChatComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    console.log(this.getChannels());
    console.log("ASDASD");
  }

  async getChannels() {
    // Read the document for user 'Ada Lovelace':
    const documentSnapshot = await firestore()
      .collection('channels')
      .get();

    console.log(documentSnapshot);
  }

  changeToBack() {
    this.props.navigation.popToTop();
  }

  render() {
    return (
      <ChatScreen
        changeToBack={() => this.changeToBack()}
      />
    )
  }
}

export default ChatComponent;